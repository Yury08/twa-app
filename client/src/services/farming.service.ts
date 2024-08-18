import { axiosWithAuth } from '../api/interceptors'
import { IFarmingResponse } from '../types/farming.types'

export class FarmingService {
	private FARMING_URL = '/farming'

	async startFarming() {
		const res = await axiosWithAuth.post<IFarmingResponse>(
			`${this.FARMING_URL}/start`
		)
		return res.data
	}

	// ничего не возваращает
	async claimFarming() {
		const res = await axiosWithAuth.post(`${this.FARMING_URL}/claim`)
		return res
	}
}

export const farmingService = new FarmingService()
