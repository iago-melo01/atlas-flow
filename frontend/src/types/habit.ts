export type CadenceType = 'daily' | 'weekly' | 'custom'

export type CadenceConfig = {
  days_of_week?: number[]
  times_per_week?: number
}

export type Habit = {
  id: number
  uuid: string
  name: string
  description: string | null
  icon: string
  is_active: boolean
  cadence_type: CadenceType
  cadence_config: CadenceConfig | null
  user_id: number
  habit_template_id: number | null
  created_at: string
  updated_at: string
}

export type HabitListResponse = {
  habits: Habit[]
}

export type CreateHabitPayload = {
  name: string
  description: string
  icon: string
  cadence_type: CadenceType
  cadence_config?: CadenceConfig | null
}

export type CreateHabitResponse = {
  message: string
  habit: Habit
}
