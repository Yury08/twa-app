import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { FarmingController } from './farming.controller'
import { FarmingService } from './farming.service'

@Module({
	controllers: [FarmingController],
	providers: [FarmingService, PrismaService, UserService],
	exports: [FarmingService]
})
export class FarmingModule {}
