type HabitCheckButtonProps = {
  name: string
  isDone: boolean
  isPending: boolean
  onToggle: () => void
}

// Botão (e não checkbox) porque a ação é imediata; aria-pressed faz o leitor de tela anunciar marcado/desmarcado.
export function HabitCheckButton({ name, isDone, isPending, onToggle }: HabitCheckButtonProps) {
  return (
    <button
      className={isDone ? 'habit-check is-done' : 'habit-check'}
      type="button"
      aria-pressed={isDone}
      aria-label={`${name} feito hoje`}
      disabled={isPending}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </button>
  )
}
