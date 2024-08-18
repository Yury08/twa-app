import { axiosWithAuth } from '../api/interceptors'
import { IUser } from '../types/auth.types'
import { IFriend } from '../types/friend.types'

export class FriendService {
	private FRIEND_URL = '/friends'

	async getAllFriends() {
		const res = await axiosWithAuth.get<IFriend[]>(`${this.FRIEND_URL}/all`)
		return res.data
	}

	// возвращает список всех друзей с обновленным полем earn
	async updateFriendsEarning() {
		const res = await axiosWithAuth.put<IFriend[]>(`${this.FRIEND_URL}/update`)
		return res.data
	}

	// возвращает user с обновленным полем баланса
	async claimFriendReward() {
		const res = await axiosWithAuth.post<IUser>(`${this.FRIEND_URL}/claim`)
		return res
	}
}

export const friendService = new FriendService()
