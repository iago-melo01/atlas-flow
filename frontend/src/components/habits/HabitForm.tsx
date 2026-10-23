import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { CADENCE_OPTIONS, WEEKDAY_OPTIONS, formatCadenceDraft } from '../../lib/habit-cadence'
import { extractValidationErrors, firstFieldError } from '../../lib/validation'
import type { CadenceConfig, CadenceType } from '../../types/habit'
import type { HabitTemplate } from '../../types/habit-template'

const ICON_SHORTCUTS: readonly string[] = ['💧', '🏋️', '📚', '🧘', '🚶']

const VALIDATED_FIELDS = [
  'name',
  'description',
  'icon',
  'cadence_type',
  'cadence_config.days_of_week',
  'cadence_config.times_per_week',
]

export type HabitFormValues = {
  name: string
  description: string | null
  icon: string
  cadence_type: CadenceType
  cadence_config: CadenceConfig | null
}

export type HabitFormSubmit = HabitFormValues & {
  habit_template_uuid: string | null
}

type HabitFormProps = {
  onSubmit: (values: HabitFormSubmit) => Promise<void>
  submitLabel: string
  submittingLabel: string
  initialValues?: HabitFormValues
  templates?: HabitTemplate[]
  onCancel?: () => void
  isClosing?: boolean
}

export function HabitForm({
  onSubmit,
  submitLabel,
  submittingLabel,
  initialValues,
  templates = [],
  onCancel,
  isClosing = false,
}: HabitFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [icon, setIcon] = useState<string>(initialValues?.icon ?? ICON_SHORTCUTS[0])
  const [cadence_type, setCadenceType] = useState<CadenceType>(initialValues?.cadence_type ?? 'daily')
  const [days_of_week, setDaysOfWeek] = useState<number[]>(
    initialValues?.cadence_config?.days_of_week ?? [],
  )
  const [times_per_week, setTimesPerWeek] = useState(initialValues?.cadence_config?.times_per_week ?? 3)
  const [template_uuid, setTemplateUuid] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // O ícone de um template ou de um hábito existente pode não estar entre os atalhos.
  const icon_options = ICON_SHORTCUTS.includes(icon) ? ICON_SHORTCUTS : [icon, ...ICON_SHORTCUTS]

  function toggleDay(day: number) {
    setDaysOfWeek((current) =>
      current.includes(day) ? current.filter((value) => value !== day) : [...current, day],
    )
  }

  function stepTimes(delta: number) {
    setTimesPerWeek((current) => Math.min(7, Math.max(1, current + delta)))
  }

  function applyTemplate(template: HabitTemplate) {
    if (template.uuid === template_uuid) {
      setTemplateUuid(null)
      return
    }

    setTemplateUuid(template.uuid)
    setName(template.name)
    setDescription(template.description ?? '')
    setIcon(template.icon)
    setCadenceType(template.cadence_type)
    setDaysOfWeek(template.cadence_config?.days_of_week ?? [])
    setTimesPerWeek(template.cadence_config?.times_per_week ?? 3)
    setFieldErrors({})
    setFormError(null)
  }

  function buildCadenceConfig(): CadenceConfig | null {
    if (cadence_type === 'weekly') {
      return { days_of_week: [...days_of_week].sort((left, right) => left - right) }
    }

    if (cadence_type === 'custom') {
      return { times_per_week }
    }

    return null
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

    const trimmed_description = description.trim()

    try {
      await onSubmit({
        name: name.trim(),
        description: trimmed_description === '' ? null : trimmed_description,
        icon: icon.trim(),
        cadence_type,
        cadence_config: buildCadenceConfig(),
        habit_template_uuid: template_uuid,
      })
    } catch (error) {
      const validation_errors = extractValidationErrors(error)
      const next_field_errors: Record<string, string> = {}

      for (const field of VALIDATED_FIELDS) {
        const message = firstFieldError(validation_errors, field)
        if (message) {
          next_field_errors[field] = message
        }
      }

      setFieldErrors(next_field_errors)

      if (Object.keys(next_field_errors).length === 0) {
        setFormError(
          isAxiosError(error) && error.response?.status === 403
            ? 'Você não tem permissão para essa ação.'
            : 'Não foi possível salvar. Tente novamente.',
        )
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
      {templates.length > 0 ? (
        <div className="habit-templates" role="group" aria-label="Começar de um modelo">
          <p className="habit-templates-label">Começar de um modelo</p>
          <div className="habit-templates-row">
            {templates.map((template) => {
              const is_selected = template.uuid === template_uuid

              return (
                <button
                  key={template.uuid}
                  className={is_selected ? 'habit-template-chip is-selected' : 'habit-template-chip'}
                  type="button"
                  aria-pressed={is_selected}
                  onClick={() => applyTemplate(template)}
                >
                  <span aria-hidden="true">{template.icon}</span>
                  {template.name}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <article className="habit-draft">
        <div className="habit-card-head">
          <div className="habit-icon-picker" role="group" aria-label="Ícone da rotina">
            {icon_options.map((shortcut) => (
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
          O que acontece nesse hábito (opcional)
        </label>
        <input
          id="habit-description"
          className="habit-draft-caption"
          name="description"
          maxLength={255}
          placeholder="O que acontece nesse hábito (opcional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={fieldErrors.description ? 'habit-description-error' : undefined}
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
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  )
}
