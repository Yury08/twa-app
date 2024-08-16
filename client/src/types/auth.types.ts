import { DecimalDataType } from 'sequelize'

export interface IAuthForm {
	username: string
}

export interface IUser {
	id: number
	username: string
	referralLink: string
	balance: DecimalDataType
	tickets: number
	role: Role
}

export enum Role {
	user,
	admin
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
