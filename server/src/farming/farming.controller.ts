import {
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorators'
import { FarmingService } from './farming.service'

@Controller('farming')
export class FarmingController {
	constructor(private readonly farmingService: FarmingService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('/start')
	startFarming(@CurrentUser('id') userId: string) {
		return this.farmingService.startFarming(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('/claim')
	stopFarming(@CurrentUser('id') userId: string) {
		return this.farmingService.getFarmingValue(userId)
	}
}
