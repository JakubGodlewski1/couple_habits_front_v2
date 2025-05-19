//filter habits by given tab
import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { habitFilters } from "@/features/habits/filters/filters"

export const getHabitsByTabs = (
  habits: HabitFromBackend[],
): Record<HabitStateTab, HabitFromBackend[]> => ({
  all: habits!,
  todo: [
    ...habits!.filter(habitFilters.scheduledForToday),
    ...habits.filter(habitFilters.scheduledForThisWeek),
  ].filter((h) => !h.isCompleted),
  completed: [
    ...habits!.filter(habitFilters.scheduledForToday),
    ...habits.filter(habitFilters.scheduledForThisWeek),
  ].filter((h) => h.isCompleted),
})

export const budgesByDisplayTab: Record<
  HabitStateTab,
  { label: string; filter: (habit: HabitFromBackend) => boolean }[]
> = {
  todo: [
    { label: "Today", filter: habitFilters.scheduledForToday },
    { label: "This week", filter: habitFilters.scheduledForThisWeek },
  ],
  completed: [
    { label: "Today", filter: habitFilters.scheduledForToday },
    { label: "This week", filter: habitFilters.scheduledForThisWeek },
  ],
  all: [
    { label: "Daily", filter: habitFilters.daily },
    { label: "Weekly", filter: habitFilters.weekly },
    { label: "Specific days", filter: habitFilters.specificDays },
  ],
}
