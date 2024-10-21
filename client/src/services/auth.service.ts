import { axiosClassic } from '../api/interceptors'
import { IAuthForm, IAuthResponse } from '../types/auth.types'

import { saveTokenStorage } from './auth-token.service'

export class AuthService {
	async main(type: 'login' | 'reg', data: IAuthForm) {
		const res = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data)

		if (res.data.accessToken) saveTokenStorage(res.data.accessToken)

		return res
	}

	async getNewTokens() {
		const res = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)
		if (res.data.accessToken) saveTokenStorage(res.data.accessToken)

		return res
	}
}

export const authService = new AuthService()
