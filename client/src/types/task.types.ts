import { IUser } from './auth.types'
import { IBase } from './main.types'

export interface ITask extends IBase {
	title: string
	reward: number
	type: TypeTask
	UserTask: Pick<IUserTask, 'isCompleted'>
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

export type ITaskForm = Partial<
	Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'UserTask'>
>

export type ITaskCompleteResponse = Pick<ITask, 'UserTask'>
