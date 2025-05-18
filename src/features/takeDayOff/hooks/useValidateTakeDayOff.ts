import { useGetStats } from "@/features/stats/api/hooks/useGetStats"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { habitFilters } from "@/features/habits/filters/filters"

export const useValidateTakeDayOff = () => {
  const { stats } = useGetStats()
  const { data: habits } = useGetHabits()

  const validateTakeDayOff = (
    dayOffPrice: number | undefined,
  ): { result: false; message: string } | { result: true } => {
    //validate user has enough points
    if (!stats || !stats.points || !dayOffPrice || stats.points < dayOffPrice)
      return {
        result: false,
        message: "You don't have enough points to take a day off",
      }

    //validate user has any uncompleted habits scheduled for today
    if (
      !habits ||
      habits
        .filter(habitFilters.scheduledForToday)
        .filter(habitFilters.uncompleted).length === 0
    ) {
      return {
        result: false,
        message: "You don't have any habits scheduled for today",
      }
    }

    return { result: true }
  }

  return { validateTakeDayOff }
}
