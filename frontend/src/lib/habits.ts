import { api, prepareAuthRequest } from './api'
import type {
  CheckInResponse,
  CreateHabitPayload,
  CreateHabitResponse,
  Habit,
  HabitCheckIn,
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

export async function deleteHabit(uuid: string): Promise<void> {
  await prepareAuthRequest()
  await api.delete(`/api/habit/${uuid}`)
}

export async function checkInHabit(uuid: string): Promise<HabitCheckIn> {
  await prepareAuthRequest()
  const response = await api.post<CheckInResponse>(`/api/habit/${uuid}/checkin`)
  return response.data.check_in
}

export async function uncheckHabit(uuid: string): Promise<void> {
  await prepareAuthRequest()
  await api.delete(`/api/habit/${uuid}/checkin`)
}
