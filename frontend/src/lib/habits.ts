import { api, prepareAuthRequest } from './api'
import type {
  CreateHabitPayload,
  CreateHabitResponse,
  Habit,
  HabitListResponse,
  UpdateHabitPayload,
  UpdateHabitResponse,
} from '../types/habit'

export async function listHabits(): Promise<Habit[]> {
  const response = await api.get<HabitListResponse>('/api/habit/list')
  return response.data.habits
}

export async function createHabit(payload: CreateHabitPayload): Promise<Habit> {
  await prepareAuthRequest()
  const response = await api.post<CreateHabitResponse>('/api/habit/create', payload)
  return response.data.habit
}

export async function updateHabit(uuid: string, payload: UpdateHabitPayload): Promise<Habit> {
  await prepareAuthRequest()
  const response = await api.put<UpdateHabitResponse>(`/api/habit/${uuid}`, payload)
  return response.data.habit
}
