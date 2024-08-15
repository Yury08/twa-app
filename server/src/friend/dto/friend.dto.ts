import { IsNumber, IsOptional, IsString } from 'class-validator'

export class FriendDto {
	@IsString()
	username: string

	@IsString()
	userId: string

	@IsOptional()
	@IsNumber()
	earn: number
}
