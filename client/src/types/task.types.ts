import { IUser } from './auth.types'
import { IBase } from './main.types'

export interface ITask extends IBase {
	title: string
	reward: number
	type: TypeTask
	UserTask: IUserTask
}

export interface IUserTask {
	id: string
	user: IUser
	userId: string
	task: ITask
	taskId: string
	isCompleted: boolean
	title: string
}

export enum TypeTask {
	socials,
	airdrop,
	promo,
	general
}
