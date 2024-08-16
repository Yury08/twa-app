import {
	Body,
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CheckRole } from 'src/auth/decorators/role.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorators'
import { MenuDto } from './dto/menu.dto'
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

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post('/menu/create')
	@HttpCode(200)
	createUser(@CheckRole() isAdmin: boolean, @Body() dto: MenuDto) {
		if (isAdmin) {
			return this.userService.createMenu(dto)
		}
		throw new NotFoundException(
			'You do not have permission to make this request.'
		)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Get('/menu/all')
	@HttpCode(200)
	getAllMenu(@CheckRole() isAdmin: boolean) {
		if (isAdmin) {
			return this.userService.getAllMenu()
		}
		throw new NotFoundException(
			'You do not have permission to make this request.'
		)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('/menu/update/:id')
	@HttpCode(200)
	updateMenu(
		@CheckRole() isAdmin: boolean,
		@Body() dto: MenuDto,
		@Param('id') id: string
	) {
		if (isAdmin) {
			return this.userService.updateMenu(dto, id)
		}
		throw new NotFoundException(
			'You do not have permission to make this request.'
		)
	}
}
