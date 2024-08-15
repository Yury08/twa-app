import {
	Controller,
	Get,
	HttpCode,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorators'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@HttpCode(200)
	@Auth()
	getUser(@CurrentUser('id') userId: string) {
		return this.userService.getById(userId)
	}
}
