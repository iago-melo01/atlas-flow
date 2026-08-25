import { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HabitCreateForm } from '../components/habits/HabitCreateForm'
import { HabitList } from '../components/habits/HabitList'
import { useAuth } from '../auth/useAuth'
import { listHabits } from '../lib/habits'
import atlasLogo from '../assets/atlas_logo.png'
import type { Habit } from '../types/habit'
import '../styles/dashboard.css'
import '../styles/habits.css'

export function HabitsPage() {
  const { user, logout } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreateClosing, setIsCreateClosing] = useState(false)
  const [justAddedUuid, setJustAddedUuid] = useState<string | null>(null)

  const loadHabits = useCallback(async (options?: { silent?: boolean }) => {
    if (!options?.silent) {
      setIsLoading(true)
    }
    setLoadError(null)

    try {
      const next_habits = await listHabits()
      setHabits(next_habits)
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        return
      }

      setHabits([])
      setLoadError('Não foi possível carregar seus hábitos.')
    } finally {
      if (!options?.silent) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void loadHabits()
  }, [loadHabits])

  useEffect(() => {
    if (!isCreateClosing) {
      return
    }

    const timeout_id = window.setTimeout(() => {
      setIsCreateOpen(false)
      setIsCreateClosing(false)
    }, 200)

    return () => {
      window.clearTimeout(timeout_id)
    }
  }, [isCreateClosing])

  useEffect(() => {
    if (!justAddedUuid) {
      return
    }

    const timeout_id = window.setTimeout(() => {
      setJustAddedUuid(null)
    }, 700)

    return () => {
      window.clearTimeout(timeout_id)
    }
  }, [justAddedUuid])

  function closeCreate() {
    if (!isCreateOpen || isCreateClosing) {
      return
    }

    setIsCreateClosing(true)
  }

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-topbar">
        <Link className="dashboard-brand" to="/dashboard" aria-label="Atlas Flow dashboard">
          <img src={atlasLogo} alt="" className="dashboard-brand-mark" />
          <span>Atlas Flow</span>
        </Link>

        <div className="dashboard-actions">
          <Link className="dashboard-nav-link" to="/dashboard">
            Hoje
          </Link>
          <span className="dashboard-user">{user?.name}</span>
          <button
            className="dashboard-logout"
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </header>

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
            aria-expanded={isCreateOpen && !isCreateClosing}
            onClick={() => {
              if (isCreateOpen) {
                closeCreate()
                return
              }

              setIsCreateOpen(true)
            }}
          >
            {isCreateOpen ? 'Fechar' : 'Novo hábito'}
          </button>
        </section>

        <section className={isCreateOpen ? 'habits-layout is-create-open' : 'habits-layout'}>
          <div>
            <HabitList
              habits={habits}
              isLoading={isLoading}
              error={loadError}
              justAddedUuid={justAddedUuid}
              onRetry={() => void loadHabits()}
            />
          </div>
          {isCreateOpen ? (
            <HabitCreateForm
              isClosing={isCreateClosing}
              onCreated={(habit) => {
                setJustAddedUuid(habit.uuid)
                closeCreate()
                void loadHabits({ silent: true })
              }}
              onCancel={closeCreate}
            />
          ) : null}
        </section>
      </main>
    </div>
  )
}
