import type { CadenceConfig, CadenceType } from './habit'

export type HabitTemplate = {
  uuid: string
  name: string
  description: string | null
  icon: string
  cadence_type: CadenceType
  cadence_config: CadenceConfig | null
  is_active: boolean
}

export type HabitTemplateListResponse = {
  habit_templates: HabitTemplate[]
}

export type CreateHabitTemplatePayload = {
  name: string
  description: string | null
  icon: string
  cadence_type: CadenceType
  cadence_config?: CadenceConfig | null
}

export type UpdateHabitTemplatePayload = Partial<CreateHabitTemplatePayload>

export type HabitTemplateResponse = {
  message: string
  habit_template: HabitTemplate
}
