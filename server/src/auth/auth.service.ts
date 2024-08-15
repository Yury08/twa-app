import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Task } from '@prisma/client'
import type { Response } from 'express'
import { PrismaService } from 'src/prisma.service'
import { TasksService } from 'src/tasks/tasks.service'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	REFRESH_TOKEN_NAME = 'refreshToken'
	EXPIRES_DAY_REFRESH_TOKEN = 1
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		private tasksService: TasksService,
		private prisma: PrismaService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id, user.username, user.role)

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByUsername(dto.username)
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)
		const tokens = this.issueTokens(user.id, user.username, user.role)

		await this.prisma.farming.create({ data: { userId: user.id } })

		const tasks: Task[] = await this.tasksService.getAll()

		// медленный выриант создания записей в UserTasks
		// if (tasks) {
		// 	tasks.map(task => {
		// 		this.tasksService.createUserTask(user.id, task)
		// 	})
		// }

		if (tasks) {
			this.prisma.$transaction(async prisma => {
				const usersTask = tasks.map(task => ({
					isCompleted: false,
					title: task.title,
					taskId: task.id,
					userId: user.id
				}))

				await prisma.userTasks.createMany({
					data: usersTask
				})
				console.log('CREATE SUCCESSFULLY')
			})
		}

		return {
			user,
			...tokens
		}
	}

	private issueTokens(userId: string, username: string, role: string) {
		const data = { id: userId, username, role }

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByUsername(dto.username)
		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async getNewTokens(refreshToken: string) {
		const res = await this.jwtService.verifyAsync(refreshToken)
		if (!res) throw new UnauthorizedException('Invalid refresh token')
		const user = await this.userService.getById(res.id)
		const tokens = this.issueTokens(user.id, user.username, user.role)
		return {
			user,
			...tokens
		}
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRES_DAY_REFRESH_TOKEN)
		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			secure: true,
			domain: 'localhost',
			expires: expiresIn,
			// lax if prod
			sameSite: 'none'
		})
	}

	removeRefreshTokenToResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			// lax if prod
			sameSite: 'none'
		})
	}
}
