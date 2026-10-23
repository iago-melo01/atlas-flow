import type { CadenceConfig, CadenceType } from '../types/habit'

export type CadenceSource = {
  cadence_type: CadenceType
  cadence_config: CadenceConfig | null
}

export const CADENCE_OPTIONS: Array<{ value: CadenceType; label: string }> = [
  { value: 'daily', label: 'Diário' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'custom', label: 'Personalizado' },
]

export const WEEKDAY_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Seg' },
  { value: 2, label: 'Ter' },
  { value: 3, label: 'Qua' },
  { value: 4, label: 'Qui' },
  { value: 5, label: 'Sex' },
  { value: 6, label: 'Sáb' },
]

export function formatCadence(source: CadenceSource): string {
  return formatCadenceDraft(
    source.cadence_type,
    source.cadence_config?.days_of_week,
    source.cadence_config?.times_per_week,
  )
}

export function formatCadenceDraft(
  cadence_type: CadenceType,
  days_of_week?: number[],
  times_per_week?: number,
): string {
  if (cadence_type === 'daily') {
    return 'Diário'
  }

  if (cadence_type === 'weekly') {
    const days = [...(days_of_week ?? [])].sort((left, right) => left - right)
    const labels = days
      .map((day) => WEEKDAY_OPTIONS.find((option) => option.value === day)?.label)
      .filter((label): label is string => Boolean(label))

    return labels.length > 0 ? `Semanal · ${labels.join(', ')}` : 'Semanal'
  }

  return times_per_week ? `${times_per_week}x por semana` : 'Personalizado'
}
