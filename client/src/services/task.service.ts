import { axiosWithAuth } from '../api/interceptors'
import { ITask, ITaskCompleteResponse, ITaskForm } from '../types/task.types'

export class TaskService {
	private TASK_URL = '/tasks'

	async getAllTasks() {
		const res = await axiosWithAuth.get<ITask[]>(`${this.TASK_URL}`)
		return res.data
	}

	async completeTask() {
		const res = await axiosWithAuth.post<ITaskCompleteResponse>(
			`${this.TASK_URL}/complete`
		)
		return res.data
	}

	// этот метод только для admin пользователей
	async createTask(data: ITaskForm) {
		const res = await axiosWithAuth.post<ITask>(`${this.TASK_URL}/create`, data)
		return res.data
	}
}

export const taskService = new TaskService()
