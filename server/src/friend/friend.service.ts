import { Injectable } from '@nestjs/common'
import { Friend } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class FriendService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async create(username: string, userId: string) {
		const data = {
			username: username,
			userId: userId
		}
		return this.prisma.friend.create({
			data
		})
	}

	async allFriendsUser(userId: string) {
		return this.prisma.friend.findMany({
			where: {
				userId
			}
		})
	}

	async updateEarning(userId: string) {
		const allFriends = await this.allFriendsUser(userId)
		allFriends.map(async (friend: Friend) => {
			const user = await this.userService.getByUsername(friend.username)
			const friendBalance = user.balance
			const earn: Decimal = friendBalance.times(new Decimal(0.15))

			await this.prisma.friend.update({
				where: {
					id: friend.id,
					userId
				},
				data: {
					earn
				}
			})
		})
		return allFriends
	}

	async calcEarning(allFriends: Friend[]) {
		const totalEarn = allFriends.reduce(
			(acc, friend) => acc.plus(new Decimal(friend.earn)),
			new Decimal(0)
		)
		return totalEarn
	}

	async cleanEarning(allFriends: Friend[]) {
		allFriends.map(async (friend: Friend) => {
			await this.prisma.friend.update({
				where: {
					id: friend.id
				},
				data: {
					earn: 0
				}
			})
		})
	}

	async getFriendsEarning(userId: string) {
		const allFriends = await this.allFriendsUser(userId)
		const totalEarn = await this.calcEarning(allFriends)
		await this.cleanEarning(allFriends)
		return this.userService.updateBalance(totalEarn, userId)
	}
}
