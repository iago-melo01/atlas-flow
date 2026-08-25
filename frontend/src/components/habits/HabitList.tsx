import { formatCadence } from '../../lib/habit-cadence'
import type { Habit } from '../../types/habit'

type HabitListProps = {
  habits: Habit[]
  isLoading: boolean
  error: string | null
  justAddedUuid?: string | null
  onRetry: () => void
}

export function HabitList({ habits, isLoading, error, justAddedUuid, onRetry }: HabitListProps) {
  if (isLoading) {
    return <p className="habits-status">Carregando hábitos…</p>
  }

  if (error) {
    return (
      <div className="habits-status-card">
        <p>{error}</p>
        <button className="habits-retry" type="button" onClick={onRetry}>
          Tentar de novo
        </button>
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <article className="habit-empty">
        <p>Nenhum hábito ativo.</p>
      </article>
    )
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li key={habit.uuid}>
          <article className={habit.uuid === justAddedUuid ? 'habit-card is-just-added' : 'habit-card'}>
            <div className="habit-card-head">
              <span className="habit-card-icon" aria-hidden="true">
                {habit.icon}
              </span>
              <h2>{habit.name}</h2>
            </div>
            {habit.description ? <p className="habit-card-description">{habit.description}</p> : null}
            <p className="habit-card-cadence">{formatCadence(habit)}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}
