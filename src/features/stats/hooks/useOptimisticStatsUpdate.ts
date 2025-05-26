/*call AFTER optimistic update on the habit*/
import { habitFilters } from "@/features/habits/filters/filters"
import { useQueryClient } from "@tanstack/react-query"
import { HabitsFromBackend } from "@/features/habits/types/habit"
import { isToday } from "date-fns"

export const useOptimisticStatsUpdate = () => {
  const queryClient = useQueryClient()

  const optimisticStatsUpdate = ({
    habitId,
    isCompleted,
  }: {
    habitId: number
    isCompleted: boolean
  }) => {
    const habits = queryClient.getQueryData<HabitsFromBackend>(["habits"])
    const { globalStrikeUpdatedAt } =
      queryClient.getQueryData<StatsStateFromBackend>(["stats-state"])!
    const habit = [...(habits?.user || []), ...(habits?.partner || [])].find(
      (h) => h.id === habitId,
    )!

    if (!habits) return

    const isHabitScheduledForToday =
      habitFilters.scheduledForTodayIncludingWeekly(habit)
    const uncompletedHabitsScheduledForToday = [
      ...habits.user,
      ...habits.partner,
    ]
      .filter(habitFilters.scheduledForTodayIncludingWeekly)
      .filter((h) => !h.isCompleted)

    // increase global strike if:
    // - habit has been completed
    // - toggled habit is scheduled for today
    // - (!globalStrikeUpdatedAt || globalStrikeUpdatedAt !== today)
    // - uncompleted habits scheduled for today after toggle = 0

    if (
      isCompleted &&
      isHabitScheduledForToday &&
      (!globalStrikeUpdatedAt || !isToday(globalStrikeUpdatedAt)) &&
      uncompletedHabitsScheduledForToday.length === 0
    ) {
      queryClient.setQueryData(["stats"], (prev: StatsFromBackend) => ({
        ...prev,
        strike: prev.strike ? prev.strike + 1 : 1,
      }))

      queryClient.setQueryData(["stats-state"], () => ({
        globalStrikeUpdatedAt: new Date(),
      }))
    }

    // decrease global strike if:
    // - toggle habit = false
    // - toggled habit is scheduled for today
    // - globalStrikeUpdatedAt === today
    // - uncompleted habits scheduled for today after toggle = 1
    if (
      !isCompleted &&
      isHabitScheduledForToday &&
      globalStrikeUpdatedAt &&
      isToday(globalStrikeUpdatedAt) &&
      uncompletedHabitsScheduledForToday.length === 1
    ) {
      queryClient.setQueryData(["stats"], (prev: StatsFromBackend) => ({
        ...prev,
        strike: prev.strike ? prev.strike - 1 : 0,
      }))

      queryClient.setQueryData(["stats-state"], () => ({
        globalStrikeUpdatedAt: null,
      }))
    }
  }

  return { optimisticStatsUpdate }
}
