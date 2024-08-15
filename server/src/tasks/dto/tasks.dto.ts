import { TypeTask } from '@prisma/client'
import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class TasksDto {
	@IsString()
	title: string

	@IsBoolean()
	isCompleted: boolean = false

	@IsNumber()
	reward: number

	@IsString()
	type: TypeTask
}
