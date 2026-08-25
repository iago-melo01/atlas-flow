import { api, prepareAuthRequest } from './api'
import type { CreateHabitPayload, CreateHabitResponse, Habit, HabitListResponse } from '../types/habit'

export async function listHabits(): Promise<Habit[]> {
  const response = await api.get<HabitListResponse>('/api/habit/list')
  return response.data.habits
}

export async function createHabit(payload: CreateHabitPayload): Promise<Habit> {
  await prepareAuthRequest()
  const response = await api.post<CreateHabitResponse>('/api/habit/create', payload)
  return response.data.habit
}
