/*call AFTER optimistic update on the habit*/
import { habitFilters } from "@/features/habits/filters/filters"
import { useQueryClient } from "@tanstack/react-query"
import { HabitsFromBackend } from "@/features/habits/types/habit"
import { queryKeys } from "@/config/queryKeys"

export const useOptimisticStatsUpdate = () => {
  const queryClient = useQueryClient()

  const optimisticStatsUpdate = ({
    habitId,
    isCompleted,
  }: {
    habitId: number
    isCompleted: boolean
  }) => {
    const habits = queryClient.getQueryData<HabitsFromBackend>(
      queryKeys.habits.get,
    )
    const { isCompleted: isGlobalStrikeCompleted } = queryClient.getQueryData<{
      isCompleted: boolean
    }>(queryKeys.statsStrikeCompletion.get)!
    const habit = [...(habits?.user || []), ...(habits?.partner || [])].find(
      (h) => h.id === habitId,
    )!

    if (!habits) return

    const isHabitScheduledForToday =
      habitFilters.scheduledForTodayIncludingWeeklyAndMonthly(habit)
    const uncompletedHabitsScheduledForToday = [
      ...habits.user,
      ...habits.partner,
    ]
      .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)
      .filter(habitFilters.isIncompleted)

    /* update points on toggle*/

    queryClient.setQueryData(queryKeys.stats.get, (prev: StatsFromBackend) => ({
      ...prev,
      points: isCompleted
        ? prev.points! + 10
        : prev.points! >= 10
          ? prev.points! - 10
          : 0,
    }))

    /*update global strike on toggle*/
    // increase global strike if:
    // - habit has been completed
    // - toggled habit is scheduled for today
    // - (!globalStrikeUpdatedAt || globalStrikeUpdatedAt !== today)
    // - uncompleted habits scheduled for today after toggle = 0

    if (
      isCompleted &&
      isHabitScheduledForToday &&
      !isGlobalStrikeCompleted &&
      uncompletedHabitsScheduledForToday.length === 0
    ) {
      queryClient.setQueryData(
        queryKeys.stats.get,
        (prev: StatsFromBackend) => ({
          ...prev,
          strike: prev.strike ? prev.strike + 1 : 1,
        }),
      )

      queryClient.setQueryData(queryKeys.statsStrikeCompletion.get, () => ({
        isCompleted: true,
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
      isGlobalStrikeCompleted &&
      uncompletedHabitsScheduledForToday.length === 1
    ) {
      queryClient.setQueryData(
        queryKeys.stats.get,
        (prev: StatsFromBackend) => ({
          ...prev,
          strike: prev.strike ? prev.strike - 1 : 0,
        }),
      )

      queryClient.setQueryData(queryKeys.statsStrikeCompletion.get, () => ({
        isCompleted: false,
      }))
    }
  }

  return { optimisticStatsUpdate }
}
