import { DecimalDataType } from 'sequelize'

import { IUser } from './auth.types'
import { IBase } from './main.types'

export interface IFriend extends IBase {
	username: string
	earn: DecimalDataType
	user: IUser
	userId: string
}
