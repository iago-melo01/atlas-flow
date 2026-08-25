import { type FormEvent, useState } from 'react'
import { createHabit } from '../../lib/habits'
import { CADENCE_OPTIONS, WEEKDAY_OPTIONS, formatCadenceDraft } from '../../lib/habit-cadence'
import { extractValidationErrors, firstFieldError } from '../../lib/validation'
import type { CadenceType, CreateHabitPayload, Habit } from '../../types/habit'

const ICON_SHORTCUTS = ['💧', '🏋️', '📚', '🧘', '🚶'] as const

type HabitCreateFormProps = {
  onCreated: (habit: Habit) => void
  onCancel?: () => void
  isClosing?: boolean
}

export function HabitCreateForm({ onCreated, onCancel, isClosing = false }: HabitCreateFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState<string>(ICON_SHORTCUTS[0])
  const [cadence_type, setCadenceType] = useState<CadenceType>('daily')
  const [days_of_week, setDaysOfWeek] = useState<number[]>([])
  const [times_per_week, setTimesPerWeek] = useState(3)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function toggleDay(day: number) {
    setDaysOfWeek((current) =>
      current.includes(day) ? current.filter((value) => value !== day) : [...current, day],
    )
  }

  function stepTimes(delta: number) {
    setTimesPerWeek((current) => Math.min(7, Math.max(1, current + delta)))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setFieldErrors({})
    setFormError(null)

    if (cadence_type === 'weekly' && days_of_week.length === 0) {
      setFieldErrors({ 'cadence_config.days_of_week': 'Escolha pelo menos um dia' })
      setIsSubmitting(false)
      return
    }

    const payload: CreateHabitPayload = {
      name: name.trim(),
      description: description.trim(),
      icon: icon.trim(),
      cadence_type,
    }

    if (cadence_type === 'weekly') {
      payload.cadence_config = {
        days_of_week: [...days_of_week].sort((left, right) => left - right),
      }
    }

    if (cadence_type === 'custom') {
      payload.cadence_config = {
        times_per_week,
      }
    }

    try {
      const habit = await createHabit(payload)
      onCreated(habit)
    } catch (error) {
      const validation_errors = extractValidationErrors(error)
      const next_field_errors: Record<string, string> = {}
      const fields = [
        'name',
        'description',
        'icon',
        'cadence_type',
        'cadence_config.days_of_week',
        'cadence_config.times_per_week',
      ]

      for (const field of fields) {
        const message = firstFieldError(validation_errors, field)
        if (message) {
          next_field_errors[field] = message
        }
      }

      setFieldErrors(next_field_errors)

      if (Object.keys(next_field_errors).length === 0) {
        setFormError('Não foi possível adicionar à rotina. Tente novamente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const cadence_preview = formatCadenceDraft(cadence_type, days_of_week, times_per_week)

  return (
    <form
      className={isClosing ? 'habit-composer is-closing' : 'habit-composer'}
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
    >
      <article className="habit-draft">
        <div className="habit-card-head">
          <div className="habit-icon-picker" role="group" aria-label="Ícone da rotina">
            {ICON_SHORTCUTS.map((shortcut) => (
              <button
                key={shortcut}
                className={shortcut === icon ? 'is-selected' : undefined}
                type="button"
                aria-pressed={shortcut === icon}
                onClick={() => setIcon(shortcut)}
              >
                <span aria-hidden="true">{shortcut}</span>
                <span className="sr-only">Ícone {shortcut}</span>
              </button>
            ))}
          </div>
        </div>

        <label className="sr-only" htmlFor="habit-name">
          Nome do hábito
        </label>
        <input
          id="habit-name"
          className="habit-draft-name"
          name="name"
          maxLength={255}
          placeholder="Nome do hábito"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'habit-name-error' : undefined}
          required
        />
        {fieldErrors.name ? (
          <p id="habit-name-error" className="habit-field-error" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}

        <label className="sr-only" htmlFor="habit-description">
          O que acontece nesse hábito
        </label>
        <input
          id="habit-description"
          className="habit-draft-caption"
          name="description"
          maxLength={255}
          placeholder="O que acontece nesse hábito"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={fieldErrors.description ? 'habit-description-error' : undefined}
          required
        />
        {fieldErrors.description ? (
          <p id="habit-description-error" className="habit-field-error" role="alert">
            {fieldErrors.description}
          </p>
        ) : null}

        <p className="habit-card-cadence">{cadence_preview}</p>
        {fieldErrors.icon ? (
          <p className="habit-field-error" role="alert">
            {fieldErrors.icon}
          </p>
        ) : null}
      </article>

      <div className="habit-composer-controls">
        <div className="habit-cadence-tabs" role="group" aria-label="Quando essa rotina acontece">
          {CADENCE_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={cadence_type === option.value ? 'is-selected' : undefined}
              type="button"
              aria-pressed={cadence_type === option.value}
              onClick={() => setCadenceType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {fieldErrors.cadence_type ? (
          <p className="habit-field-error" role="alert">
            {fieldErrors.cadence_type}
          </p>
        ) : null}

        {cadence_type === 'weekly' ? (
          <div key="weekly" className="habit-cadence-reveal">
            <div className="habit-week" role="group" aria-label="Dias da semana">
              {WEEKDAY_OPTIONS.map((option) => {
                const is_selected = days_of_week.includes(option.value)

                return (
                  <button
                    key={option.value}
                    className={is_selected ? 'is-selected' : undefined}
                    type="button"
                    aria-pressed={is_selected}
                    onClick={() => toggleDay(option.value)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            {fieldErrors['cadence_config.days_of_week'] ? (
              <p className="habit-field-error" role="alert">
                {fieldErrors['cadence_config.days_of_week']}
              </p>
            ) : null}
          </div>
        ) : null}

        {cadence_type === 'custom' ? (
          <div key="custom" className="habit-cadence-reveal">
            <div className="habit-stepper" aria-label="Vezes por semana">
              <button
                type="button"
                aria-label="Diminuir"
                disabled={times_per_week <= 1}
                onClick={() => stepTimes(-1)}
              >
                −
              </button>
              <p>
                <strong>{times_per_week}×</strong>
                <span>na semana</span>
              </p>
              <button
                type="button"
                aria-label="Aumentar"
                disabled={times_per_week >= 7}
                onClick={() => stepTimes(1)}
              >
                +
              </button>
            </div>
            {fieldErrors['cadence_config.times_per_week'] ? (
              <p className="habit-field-error" role="alert">
                {fieldErrors['cadence_config.times_per_week']}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {formError ? (
        <p className="habit-form-error" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="habit-composer-actions">
        {onCancel ? (
          <button className="habit-discard" type="button" onClick={onCancel} disabled={isSubmitting}>
            Descartar
          </button>
        ) : null}
        <button className="habit-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adicionando…' : 'Adicionar à rotina'}
        </button>
      </div>
    </form>
  )
}
