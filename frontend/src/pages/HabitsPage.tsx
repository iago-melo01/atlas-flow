import { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { AppTopbar } from '../components/AppTopbar'
import { HabitForm, type HabitFormSubmit } from '../components/habits/HabitForm'
import { HabitList } from '../components/habits/HabitList'
import { createHabit, listHabits, updateHabit } from '../lib/habits'
import { listHabitTemplates } from '../lib/habit-templates'
import type { Habit } from '../types/habit'
import type { HabitTemplate } from '../types/habit-template'
import '../styles/dashboard.css'
import '../styles/habits.css'

export function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [templates, setTemplates] = useState<HabitTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isFormClosing, setIsFormClosing] = useState(false)
  const [editing_habit, setEditingHabit] = useState<Habit | null>(null)
  const [justSavedUuid, setJustSavedUuid] = useState<string | null>(null)

  // Os setState ficam nos callbacks da promise para a função poder ser chamada direto do useEffect.
  const loadHabits = useCallback(
    () =>
      listHabits()
        .then((next_habits) => {
          setHabits(next_habits)
          setLoadError(null)
        })
        .catch((error: unknown) => {
          if (isAxiosError(error) && error.response?.status === 401) {
            return
          }

          setHabits([])
          setLoadError('Não foi possível carregar seus hábitos.')
        })
        .finally(() => setIsLoading(false)),
    [],
  )

  useEffect(() => {
    void loadHabits()
  }, [loadHabits])

  // Os modelos são só um atalho: se falharem, o formulário funciona sem eles.
  useEffect(() => {
    let is_active = true

    listHabitTemplates()
      .then((next_templates) => {
        if (is_active) {
          setTemplates(next_templates)
        }
      })
      .catch(() => {})

    return () => {
      is_active = false
    }
  }, [])

  useEffect(() => {
    if (!isFormClosing) {
      return
    }

    const timeout_id = window.setTimeout(() => {
      setIsFormOpen(false)
      setIsFormClosing(false)
      setEditingHabit(null)
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

  function openForm(habit: Habit | null) {
    setEditingHabit(habit)
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
    const { name, description, icon, cadence_type, cadence_config } = values

    // No update a cadência vai sempre completa (tipo + config), para o backend validar pelo tipo certo.
    const habit = editing_habit
      ? await updateHabit(editing_habit.uuid, { name, description, icon, cadence_type, cadence_config })
      : await createHabit(values)

    setJustSavedUuid(habit.uuid)
    closeForm()
    void loadHabits()
  }

  const is_creating = isFormOpen && !isFormClosing && editing_habit === null

  return (
    <div className="dashboard-shell">
      <AppTopbar />

      <main className="dashboard-main">
        <section className="dashboard-hero habits-hero">
          <div>
            <p className="dashboard-eyebrow">Hábitos</p>
            <h1>Sua rotina</h1>
            <p className="dashboard-description">Cadastre hábitos e acompanhe os que estão ativos.</p>
          </div>
          <button
            className="habit-open-create"
            type="button"
            aria-expanded={is_creating}
            onClick={() => (is_creating ? closeForm() : openForm(null))}
          >
            {is_creating ? 'Fechar' : 'Novo hábito'}
          </button>
        </section>

        <section className={isFormOpen ? 'habits-layout is-create-open' : 'habits-layout'}>
          <div>
            <HabitList
              items={habits}
              isLoading={isLoading}
              error={loadError}
              loadingText="Carregando hábitos…"
              emptyText="Nenhum hábito ativo."
              highlightUuid={justSavedUuid}
              onRetry={() => {
                setIsLoading(true)
                void loadHabits()
              }}
              onEdit={(habit) => openForm(habit)}
            />
          </div>
          {isFormOpen ? (
            <HabitForm
              key={editing_habit?.uuid ?? 'new'}
              initialValues={editing_habit ?? undefined}
              templates={editing_habit ? [] : templates}
              submitLabel={editing_habit ? 'Salvar alterações' : 'Adicionar à rotina'}
              submittingLabel={editing_habit ? 'Salvando…' : 'Adicionando…'}
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
