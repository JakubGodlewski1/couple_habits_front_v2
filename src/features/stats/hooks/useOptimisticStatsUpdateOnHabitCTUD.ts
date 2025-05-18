import { habitFilters } from "@/features/habits/filters/filters"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { useQueryClient } from "@tanstack/react-query"
import { useGetStatsState } from "@/features/stats/api/hooks/useGetStatsState"
import { isSameDay } from "date-fns"
import { queryKeys } from "@/config/queryKeys"

export const useOptimisticStatsUpdateOnHabitCTUD = () => {
  const queryClient = useQueryClient()
  const { data: statsState } = useGetStatsState()

  const onDecrement = () => {
    queryClient.setQueryData(queryKeys.stats.get, (prev: StatsFromBackend) => {
      return {
        strike: prev.strike! - 1,
        points: prev.points! - prev.strike! * 10,
      }
    })
  }

  const onIncrement = () => {
    queryClient.setQueryData(queryKeys.stats.get, (prev: StatsFromBackend) => {
      return {
        strike: prev.strike! + 1,
        points: prev.points! + (prev.strike! + 1) * 10,
      }
    })
  }

  //updates points by completing or uncompleting habit by 10
  const onToggleUpdateLocalPoints = ({ id }: { id: string }) => {
    const habits = queryClient.getQueryData(
      queryKeys.habits.get,
    ) as HabitFromBackend[]

    const toggledHabit = habits.find((habit) => habit.id === id)!

    //subtract 10 points
    if (toggledHabit?.partner.isCompleted && !toggledHabit.user.isCompleted) {
      queryClient.setQueryData(
        queryKeys.stats.get,
        (prevStats: StatsFromBackend | undefined) => {
          return {
            strike: prevStats?.strike || 0,
            points: (prevStats?.points || 0) - 10,
          }
        },
      )
    }

    //add 10 points
    if (toggledHabit?.partner.isCompleted && toggledHabit.user.isCompleted) {
      queryClient.setQueryData(
        queryKeys.stats.get,
        (prevStats: StatsFromBackend | undefined) => {
          return {
            strike: prevStats?.strike || 0,
            points: (prevStats?.points || 0) + 10,
          }
        },
      )
    }
  }

  const onHabitCTUDUpdateStats = () => {
    const habits = queryClient.getQueryData(
      queryKeys.habits.get,
    ) as HabitFromBackend[]

    //get all habits scheduled for today
    const scheduledForToday = habits.filter(
      habitFilters.scheduledForTodayIncludingWeekly,
    )

    //get all completed habits scheduled for today
    const completedHabits = scheduledForToday.filter(habitFilters.completed)

    //INCREMENT - if all habits scheduled for today are completed and globalStrikeUpdatedAt does not exist or is not today
    if (
      completedHabits.length === scheduledForToday.length &&
      scheduledForToday.length > 0 &&
      statsState &&
      (!statsState.globalStrikeUpdatedAt ||
        !isSameDay(statsState.globalStrikeUpdatedAt, new Date().toISOString()))
    ) {
      //increment
      onIncrement()
      //set globalStrikeUpdatedAt to today
      queryClient.setQueryData(queryKeys.statsState.get, () => ({
        globalStrikeUpdatedAt: new Date(),
      }))
    }

    //DECREMENT - if one habit is not completed today and globalStrikeUpdatedAt === today
    if (
      completedHabits.length + 1 === scheduledForToday.length &&
      statsState &&
      statsState.globalStrikeUpdatedAt &&
      isSameDay(statsState.globalStrikeUpdatedAt, new Date().toISOString())
    ) {
      //decrement
      onDecrement()
      //set globalStrikeUpdatedAt to null
      queryClient.setQueryData(queryKeys.statsState.get, () => ({
        globalStrikeUpdatedAt: null,
      }))
    }
  }

  return {
    onToggleUpdateLocalPoints,
    onHabitCTUDUpdateStats,
  }
}
