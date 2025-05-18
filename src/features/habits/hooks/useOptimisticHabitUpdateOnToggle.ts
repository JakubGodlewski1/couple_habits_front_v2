import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useOptimisticHabitUpdateOnToggle = () => {
  const queryClient = useQueryClient()

  const onToggleUpdateHabit = ({
    isCompleted,
    id,
  }: {
    isCompleted: boolean
    id: string
  }) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitFromBackend[]) => {
        if (!habits || !habits.length) return []

        const habitToToggle = habits.find((h) => h.id === id)!

        const getNewStrike = (currentStrike: number) => {
          if (isCompleted && habitToToggle.partner.isCompleted) {
            return currentStrike + 1
          } else if (!isCompleted && habitToToggle.partner.isCompleted) {
            return currentStrike - 1
          } else return currentStrike
        }

        const updatedHabit = {
          ...habitToToggle,
          strike: getNewStrike(habitToToggle.strike),
          user: { label: habitToToggle.user.label, isCompleted },
        } as HabitFromBackend

        return habits.map((h) => (h.id === id ? updatedHabit : h))
      },
    )
  }

  return { onToggleUpdateHabit }
}
