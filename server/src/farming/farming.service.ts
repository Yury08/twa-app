import { Injectable, NotFoundException } from '@nestjs/common'
import { Decimal } from 'decimal.js'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class FarmingService {
	private countdown: number = 8 * 60 * 60 // 8 часов в миллисекундах
	// private countdown: number = 2 * 60 * 100 // 2 минуты в миллисекундах
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService
	) {}

	getTimerId(userId: string) {
		return this.prisma.farming.findFirst({
			where: {
				userId
			}
		})
	}

	async startFarming(userId: string) {
		const user = await this.userService.getById(userId)
		if (!user) throw new NotFoundException('User not found')
		return this.prisma.farming.update({
			where: {
				id: (await this.getTimerId(userId)).id
			},
			data: {
				isCompleted: false,
				amount: new Decimal(this.countdown * 2).dividedBy(1000),
				totalSeconds: this.countdown
			}
		})
	}

	async getFarmingValue(userId: string) {
		const timer = await this.prisma.farming.findFirst({
			where: { userId }
		})

		if (timer) {
			this.userService.updateBalance(timer.amount, userId)
			await this.prisma.farming.update({
				where: {
					id: (await this.getTimerId(userId)).id
				},
				data: {
					isCompleted: true,
					totalSeconds: 0,
					amount: 0
				}
			})
		}
	}
}
