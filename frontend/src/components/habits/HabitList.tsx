import type { ReactNode } from 'react'
import { type CadenceSource, formatCadence } from '../../lib/habit-cadence'
import { HabitCheckButton } from './HabitCheckButton'

export type HabitListItem = CadenceSource & {
  uuid: string
  name: string
  description: string | null
  icon: string
}

type HabitListProps<T extends HabitListItem> = {
  items: T[]
  isLoading: boolean
  error: string | null
  loadingText: string
  emptyText: string
  highlightUuid?: string | null
  onRetry: () => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  editingUuid?: string | null
  renderEditor?: (item: T) => ReactNode
  isChecked?: (item: T) => boolean
  isCheckPending?: (item: T) => boolean
  onToggleCheck?: (item: T) => void
}

export function HabitList<T extends HabitListItem>({
  items,
  isLoading,
  error,
  loadingText,
  emptyText,
  highlightUuid,
  onRetry,
  onEdit,
  onDelete,
  editingUuid,
  renderEditor,
  isChecked,
  isCheckPending,
  onToggleCheck,
}: HabitListProps<T>) {
  if (isLoading) {
    return <p className="habits-status">{loadingText}</p>
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

  if (items.length === 0) {
    return (
      <article className="habit-empty">
        <p>{emptyText}</p>
      </article>
    )
  }

  return (
    <ul className="habit-list">
      {items.map((item) => {
        const is_done = isChecked?.(item) ?? false
        const card_class = [
          'habit-card',
          item.uuid === highlightUuid ? 'is-just-added' : null,
          is_done ? 'is-done' : null,
        ]
          .filter(Boolean)
          .join(' ')

        return (
        <li key={item.uuid}>
          {/* O card em edição vira o próprio formulário, no mesmo lugar da lista. */}
          {item.uuid === editingUuid && renderEditor ? (
            renderEditor(item)
          ) : (
            <article className={card_class}>
              <div className="habit-card-head">
                {onToggleCheck ? (
                  <HabitCheckButton
                    name={item.name}
                    isDone={is_done}
                    isPending={isCheckPending?.(item) ?? false}
                    onToggle={() => onToggleCheck(item)}
                  />
                ) : null}
                <span className="habit-card-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h2>{item.name}</h2>
                {onEdit || onDelete ? (
                  <div className="habit-card-actions">
                    {onEdit ? (
                      <button className="habit-card-action" type="button" onClick={() => onEdit(item)}>
                        Editar<span className="sr-only"> {item.name}</span>
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        className="habit-card-action is-danger"
                        type="button"
                        onClick={() => onDelete(item)}
                      >
                        Excluir<span className="sr-only"> {item.name}</span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {item.description ? <p className="habit-card-description">{item.description}</p> : null}
              <p className="habit-card-cadence">{formatCadence(item)}</p>
            </article>
          )}
        </li>
        )
      })}
    </ul>
  )
}
