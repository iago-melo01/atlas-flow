import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { AppTopbar } from '../components/AppTopbar'
import { listHabits } from '../lib/habits'
import type { Habit } from '../types/habit'
import '../styles/auth.css'
import '../styles/dashboard.css'

export function DashboardPage() {
  const { user } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoadingHabits, setIsLoadingHabits] = useState(true)

  useEffect(() => {
    let is_active = true

    async function loadHabits() {
      try {
        const next_habits = await listHabits()
        if (is_active) {
          setHabits(next_habits)
        }
      } catch {
        if (is_active) {
          setHabits([])
        }
      } finally {
        if (is_active) {
          setIsLoadingHabits(false)
        }
      }
    }

    void loadHabits()

    return () => {
      is_active = false
    }
  }, [])

  const preview_icons = habits.slice(0, 3).map((habit) => habit.icon).join(' ')
  const first_habit_name = habits[0]?.name
  const habits_summary = isLoadingHabits
    ? 'Carregando…'
    : habits.length === 0
      ? 'Nenhum hábito cadastrado ainda.'
      : preview_icons
        ? `${preview_icons}${first_habit_name ? ` · ${first_habit_name}` : ''}`
        : `${habits.length} hábitos ativos.`

  return (
    <div className="dashboard-shell">
      <AppTopbar />

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <p className="dashboard-eyebrow">Hoje</p>
          <h1>Olá, {user?.name?.split(' ')[0] ?? 'atleta'}.</h1>
          <p className="dashboard-description">
            Veja sua rotina de hábitos e abra o painel para cadastrar o que falta.
          </p>
        </section>

        <section className="dashboard-grid" aria-label="Resumo do dia">
          <Link className="dashboard-card dashboard-card-link" to="/habits">
            <span>Hábitos</span>
            <strong>{isLoadingHabits ? '—' : String(habits.length)}</strong>
            <p>{habits_summary}</p>
            {habits.length === 0 && !isLoadingHabits ? (
              <span className="dashboard-card-cta">Criar hábito</span>
            ) : null}
          </Link>
          <article className="dashboard-card">
            <span>Treino</span>
            <strong>—</strong>
            <p>Configure sua ficha para ver o treino do dia.</p>
          </article>
          <article className="dashboard-card">
            <span>Dieta</span>
            <strong>0 kcal</strong>
            <p>Registre refeições para acompanhar macros.</p>
          </article>
          <article className="dashboard-card">
            <span>Finanças</span>
            <strong>R$ 0</strong>
            <p>Saldo geral aparecerá aqui.</p>
          </article>
        </section>

        <section className="dashboard-assistant">
          <span>Assistente Atlas</span>
          <p>Quando houver dados, o assistente resumirá seu dia e sugerirá próximos passos.</p>
        </section>
      </main>
    </div>
  )
}
