import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { AppTopbar } from '../components/AppTopbar'
import { HabitCheckButton } from '../components/habits/HabitCheckButton'
import { useHabitCheckIn } from '../hooks/useHabitCheckIn'
import { listHabits } from '../lib/habits'
import type { Habit } from '../types/habit'
import '../styles/auth.css'
import '../styles/dashboard.css'
import '../styles/habits.css'

export function DashboardPage() {
  const { user } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoadingHabits, setIsLoadingHabits] = useState(true)
  const { toggleCheckIn, isPending, checkInError } = useHabitCheckIn(setHabits)

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

  const done_count = habits.filter((habit) => habit.check_in_today).length
  const progress_percent = habits.length === 0 ? 0 : Math.round((done_count / habits.length) * 100)
  const habits_summary = isLoadingHabits
    ? 'Carregando…'
    : habits.length === 0
      ? 'Nenhum hábito cadastrado ainda.'
      : done_count === habits.length
        ? 'Tudo feito hoje.'
        : 'feitos hoje'

  return (
    <div className="dashboard-shell">
      <AppTopbar />

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <p className="dashboard-eyebrow">Hoje</p>
          <h1>Olá, {user?.name?.split(' ')[0] ?? 'atleta'}.</h1>
          <p className="dashboard-description">
            Marque o que já fez hoje e acompanhe o progresso da rotina.
          </p>
        </section>

        <section className="dashboard-grid" aria-label="Resumo do dia">
          <Link className="dashboard-card dashboard-card-link" to="/habits">
            <span>Hábitos</span>
            <strong>{isLoadingHabits ? '—' : habits.length === 0 ? '0' : `${done_count}/${habits.length}`}</strong>
            <p>{habits_summary}</p>
            {habits.length > 0 ? (
              <div className="dashboard-progress" aria-hidden="true">
                <div style={{ width: `${progress_percent}%` }} />
              </div>
            ) : null}
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

        {habits.length > 0 ? (
          <section className="dashboard-today" aria-labelledby="dashboard-today-title">
            <h2 id="dashboard-today-title">Hábitos de hoje</h2>
            {checkInError ? (
              <p className="habit-form-error" role="alert">
                {checkInError}
              </p>
            ) : null}
            <ul>
              {habits.map((habit) => (
                <li key={habit.uuid} className={habit.check_in_today ? 'is-done' : undefined}>
                  <span className="dashboard-today-icon" aria-hidden="true">
                    {habit.icon}
                  </span>
                  <span className="dashboard-today-name">{habit.name}</span>
                  <HabitCheckButton
                    name={habit.name}
                    isDone={habit.check_in_today}
                    isPending={isPending(habit.uuid)}
                    onToggle={() => void toggleCheckIn(habit)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="dashboard-assistant">
          <span>Assistente Atlas</span>
          <p>Quando houver dados, o assistente resumirá seu dia e sugerirá próximos passos.</p>
        </section>
      </main>
    </div>
  )
}
