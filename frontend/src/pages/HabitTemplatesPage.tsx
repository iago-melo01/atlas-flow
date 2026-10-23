import { useCallback, useEffect, useState } from 'react'
import { AppTopbar } from '../components/AppTopbar'
import { HabitForm, type HabitFormSubmit } from '../components/habits/HabitForm'
import { HabitList } from '../components/habits/HabitList'
import {
  createHabitTemplate,
  deleteHabitTemplate,
  listHabitTemplates,
  updateHabitTemplate,
} from '../lib/habit-templates'
import type { HabitTemplate } from '../types/habit-template'
import '../styles/dashboard.css'
import '../styles/habits.css'

export function HabitTemplatesPage() {
  const [templates, setTemplates] = useState<HabitTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isFormClosing, setIsFormClosing] = useState(false)
  const [editing_template, setEditingTemplate] = useState<HabitTemplate | null>(null)
  const [justSavedUuid, setJustSavedUuid] = useState<string | null>(null)

  // Os setState ficam nos callbacks da promise para a função poder ser chamada direto do useEffect.
  const loadTemplates = useCallback(
    () =>
      listHabitTemplates()
        .then((next_templates) => {
          setTemplates(next_templates)
          setLoadError(null)
        })
        .catch(() => {
          setTemplates([])
          setLoadError('Não foi possível carregar os modelos.')
        })
        .finally(() => setIsLoading(false)),
    [],
  )

  useEffect(() => {
    void loadTemplates()
  }, [loadTemplates])

  useEffect(() => {
    if (!isFormClosing) {
      return
    }

    const timeout_id = window.setTimeout(() => {
      setIsFormOpen(false)
      setIsFormClosing(false)
      setEditingTemplate(null)
    }, 200)

    return () => {
      window.clearTimeout(timeout_id)
    }
  }, [isFormClosing])

  useEffect(() => {
    if (!justSavedUuid) {
      return
    }

    const timeout_id = window.setTimeout(() => {
      setJustSavedUuid(null)
    }, 700)

    return () => {
      window.clearTimeout(timeout_id)
    }
  }, [justSavedUuid])

  function openForm(template: HabitTemplate | null) {
    setEditingTemplate(template)
    setIsFormClosing(false)
    setIsFormOpen(true)
  }

  function closeForm() {
    if (!isFormOpen || isFormClosing) {
      return
    }

    setIsFormClosing(true)
  }

  async function handleSubmit(values: HabitFormSubmit) {
    const payload = {
      name: values.name,
      description: values.description,
      icon: values.icon,
      cadence_type: values.cadence_type,
      cadence_config: values.cadence_config,
    }

    const template = editing_template
      ? await updateHabitTemplate(editing_template.uuid, payload)
      : await createHabitTemplate(payload)

    setJustSavedUuid(template.uuid)
    closeForm()
    void loadTemplates()
  }

  async function handleDelete(template: HabitTemplate) {
    const confirmed = window.confirm(
      `Excluir o modelo "${template.name}"? Hábitos já criados a partir dele continuam existindo.`,
    )

    if (!confirmed) {
      return
    }

    setActionError(null)

    try {
      await deleteHabitTemplate(template.uuid)

      if (editing_template?.uuid === template.uuid) {
        closeForm()
      }

      void loadTemplates()
    } catch {
      setActionError('Não foi possível excluir o modelo.')
    }
  }

  const is_creating = isFormOpen && !isFormClosing && editing_template === null

  return (
    <div className="dashboard-shell">
      <AppTopbar />

      <main className="dashboard-main">
        <section className="dashboard-hero habits-hero">
          <div>
            <p className="dashboard-eyebrow">Admin</p>
            <h1>Modelos de hábito</h1>
            <p className="dashboard-description">
              Modelos aparecem como atalho para todos os usuários ao criar um hábito.
            </p>
          </div>
          <button
            className="habit-open-create"
            type="button"
            aria-expanded={is_creating}
            onClick={() => (is_creating ? closeForm() : openForm(null))}
          >
            {is_creating ? 'Fechar' : 'Novo modelo'}
          </button>
        </section>

        {actionError ? (
          <p className="habit-form-error habits-action-error" role="alert">
            {actionError}
          </p>
        ) : null}

        <section className={isFormOpen ? 'habits-layout is-create-open' : 'habits-layout'}>
          <div>
            <HabitList
              items={templates}
              isLoading={isLoading}
              error={loadError}
              loadingText="Carregando modelos…"
              emptyText="Nenhum modelo cadastrado."
              highlightUuid={justSavedUuid}
              onRetry={() => {
                setIsLoading(true)
                void loadTemplates()
              }}
              onEdit={(template) => openForm(template)}
              onDelete={(template) => void handleDelete(template)}
            />
          </div>
          {isFormOpen ? (
            <HabitForm
              key={editing_template?.uuid ?? 'new'}
              initialValues={editing_template ?? undefined}
              submitLabel={editing_template ? 'Salvar alterações' : 'Criar modelo'}
              submittingLabel={editing_template ? 'Salvando…' : 'Criando…'}
              isClosing={isFormClosing}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          ) : null}
        </section>
      </main>
    </div>
  )
}
