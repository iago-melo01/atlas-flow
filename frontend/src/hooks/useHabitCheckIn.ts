import { type Dispatch, type SetStateAction, useRef, useState } from 'react'
import { checkInHabit, uncheckHabit } from '../lib/habits'
import type { Habit } from '../types/habit'

// Marca/desmarca o check-in de hoje de forma otimista: a tela muda na hora e volta atrás se a API falhar.
export function useHabitCheckIn(setHabits: Dispatch<SetStateAction<Habit[]>>) {
  // O ref é a trava de verdade (atualiza na hora, mesmo com cliques no mesmo tick);
  // o state só existe para re-renderizar o botão como disabled.
  const pending_ref = useRef(new Set<string>())
  const [pendingUuids, setPendingUuids] = useState<ReadonlySet<string>>(() => new Set())
  const [checkInError, setCheckInError] = useState<string | null>(null)

  function setCheckedToday(uuid: string, check_in_today: boolean) {
    setHabits((current) =>
      current.map((habit) => (habit.uuid === uuid ? { ...habit, check_in_today } : habit)),
    )
  }

  function setPending(uuid: string, is_pending: boolean) {
    if (is_pending) {
      pending_ref.current.add(uuid)
    } else {
      pending_ref.current.delete(uuid)
    }

    setPendingUuids(new Set(pending_ref.current))
  }

  async function toggleCheckIn(habit: Habit) {
    // Um pedido por hábito por vez: evita POST e DELETE chegando fora de ordem num clique duplo.
    if (pending_ref.current.has(habit.uuid)) {
      return
    }

    const next_checked = !habit.check_in_today

    setCheckInError(null)
    setPending(habit.uuid, true)
    setCheckedToday(habit.uuid, next_checked)

    try {
      if (next_checked) {
        await checkInHabit(habit.uuid)
      } else {
        await uncheckHabit(habit.uuid)
      }
    } catch {
      setCheckedToday(habit.uuid, !next_checked)
      setCheckInError(`Não foi possível atualizar "${habit.name}". Tente de novo.`)
    } finally {
      setPending(habit.uuid, false)
    }
  }

  return {
    toggleCheckIn,
    isPending: (uuid: string) => pendingUuids.has(uuid),
    checkInError,
  }
}
