import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { habitFilters } from "@/features/habits/filters/filters"

export const useIconBudge = () => {
  const { data: habits } = useGetHabits()

  useEffect(() => {
    if (!habits) return

    const uncompletedCount =
      habits.user
        .filter(habitFilters.isIncompleted)
        .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)
        .length +
      habits.partner
        .filter(habitFilters.isIncompleted)
        .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly).length

    // Set or clear badge
    Notifications.setBadgeCountAsync(uncompletedCount).catch((err) =>
      console.warn("Failed to set badge count:", err),
    )
  }, [habits])
}
