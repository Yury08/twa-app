import {
	Controller,
	Get,
	HttpCode,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorators'
import { FriendService } from './friend.service'

@Controller('friend')
export class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Get('all')
	@HttpCode(200)
	getAll(@CurrentUser('id') userId: string) {
		console.log(this.friendService.updateEarning(userId))
		return this.friendService.allFriendsUser(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('update')
	@HttpCode(200)
	update(@CurrentUser('id') userId: string) {
		return this.friendService.updateEarning(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post('claim')
	@HttpCode(200)
	claim(@CurrentUser('id') userId: string) {
		return this.friendService.getFriendsEarning(userId)
	}
}
