import { api, prepareAuthRequest } from './api'
import type {
  CreateHabitTemplatePayload,
  HabitTemplate,
  HabitTemplateListResponse,
  HabitTemplateResponse,
  UpdateHabitTemplatePayload,
} from '../types/habit-template'

export async function listHabitTemplates(): Promise<HabitTemplate[]> {
  const response = await api.get<HabitTemplateListResponse>('/api/habittemplate/list')
  return response.data.habit_templates
}

export async function createHabitTemplate(payload: CreateHabitTemplatePayload): Promise<HabitTemplate> {
  await prepareAuthRequest()
  const response = await api.post<HabitTemplateResponse>('/api/habittemplate/create', payload)
  return response.data.habit_template
}

export async function updateHabitTemplate(
  uuid: string,
  payload: UpdateHabitTemplatePayload,
): Promise<HabitTemplate> {
  await prepareAuthRequest()
  const response = await api.put<HabitTemplateResponse>(`/api/habittemplate/${uuid}`, payload)
  return response.data.habit_template
}

export async function deleteHabitTemplate(uuid: string): Promise<void> {
  await prepareAuthRequest()
  await api.delete(`/api/habittemplate/${uuid}`)
}
