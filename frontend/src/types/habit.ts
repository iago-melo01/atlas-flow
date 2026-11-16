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
  check_in_today: boolean
  created_at: string
  updated_at: string
}

export type HabitCheckIn = {
  uuid: string
  check_in_date: string
  completed_at: string
}

export type CheckInResponse = {
  message: string
  check_in: HabitCheckIn
}

export type HabitListResponse = {
  habits: Habit[]
}

export type CreateHabitPayload = {
  name: string
  description: string | null
  icon: string
  cadence_type: CadenceType
  cadence_config?: CadenceConfig | null
  habit_template_uuid?: string | null
}

export type CreateHabitResponse = {
  message: string
  habit: Habit
}

export type UpdateHabitPayload = Partial<Omit<CreateHabitPayload, 'habit_template_uuid'>>

export type UpdateHabitResponse = {
  message: string
  habit: Habit
}
