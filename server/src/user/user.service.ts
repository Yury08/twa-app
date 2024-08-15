import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Decimal } from 'decimal.js'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	private generateReferralLink(username: string) {
		return `${process.env.BASE_URL}/auth/reg?referral=${username}`
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: {
				username
			}
		})
	}

	async create(dto: AuthDto) {
		const user = {
			username: dto.username,
			role: dto.role,
			referralLink: this.generateReferralLink(dto.username)
		}
		return this.prisma.user.create({
			data: user
		})
	}

	async updateBalance(quantity: Prisma.Decimal, userId: string) {
		const balance = (await this.getById(userId)).balance.plus(
			new Decimal(quantity)
		)
		return await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				balance
			}
		})
	}

	async updateTickets(quantity: number, userId: string) {
		const tickets = (await this.getById(userId)).tickets + quantity
		return await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				tickets
			}
		})
	}
}
