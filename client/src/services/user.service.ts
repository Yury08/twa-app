import { axiosWithAuth } from '../api/interceptors'
import { IUser } from '../types/auth.types'
import { IMenu, IMenuForm } from '../types/menu.types'

export class UserService {
	private URL = '/user'

	async getUser() {
		const res = await axiosWithAuth.get<IUser>(this.URL)
		return res.data
	}

	// только для admin пользователей
	async createMenu(data: IMenuForm) {
		const res = await axiosWithAuth.post<IMenu>(`${this.URL}/menu/create`, data)
		return res.data
	}

	async getAllMenu() {
		const res = await axiosWithAuth.get<IMenu[]>(`${this.URL}/menu/all`)
		return res.data
	}

	async updateMenu(id: string, data: IMenuForm) {
		const res = await axiosWithAuth.put(`${this.URL}/menu/update/${id}`, data)
		return res.data
	}
}

export const userService = new UserService()
