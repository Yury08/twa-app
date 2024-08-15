import {
	Body,
	Controller,
	HttpCode,
	Post,
	Query,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { FriendService } from 'src/friend/friend.service'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { AuthQueryDto } from './dto/query.dto'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly friendService: FriendService
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, ...response } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('reg')
	async register(
		@Body() dto: AuthDto,
		@Query() query_param: AuthQueryDto,
		@Res({ passthrough: true }) res: Response
	) {
		const referral_name: string | undefined = query_param['referral']

		if (referral_name) {
			const { refreshToken, accessToken, user } =
				await this.authService.register(dto)
			const referral_user = await this.userService.getByUsername(referral_name)
			this.friendService.create(user.username, referral_user.id)
			this.userService.updateTickets(3, referral_user.id)
			this.authService.addRefreshTokenToResponse(res, refreshToken)
			return { user, accessToken }
		}
		const { refreshToken, ...response } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenToResponse(res)
			throw new UnauthorizedException('Refresh token not passed')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}
}
