import { View } from "react-native"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import Budge from "@/features/habits/components/HabitsDisplay/components/Budge"
import { habitFilters } from "@/features/habits/filters/filters"
import HabitCard from "@/features/habits/components/habitCard/HabitCard"
import { useShowCompletedHabitsContext } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"

type Props = {
  habits: HabitFromBackend[]
  owner: "partner" | "user"
}

const isCompleted = habitFilters.isCompleted

function sortHabits(a: HabitFromBackend, b: HabitFromBackend) {
  if (isCompleted(a) !== isCompleted(b)) {
    return isCompleted(a) ? 1 : -1
  }
  return a.id - b.id
}

export default function TodoSection({ habits, owner }: Props) {
  const { showCompletedHabits } = useShowCompletedHabitsContext()

  const getFilteredHabits = (
    filterFn: (h: HabitFromBackend) => boolean,
  ): HabitFromBackend[] =>
    habits
      .filter(filterFn)
      .filter((h) =>
        showCompletedHabits || owner === "partner" ? true : !isCompleted(h),
      )
      .sort(sortHabits)

  const rawSections = [
    {
      label: "Today",
      habits: getFilteredHabits(habitFilters.scheduledForToday),
      key: "today",
    },
    {
      label: "This Week",
      habits: getFilteredHabits(habitFilters.scheduledForThisWeek),
      key: "week",
    },
    {
      label: "This Month",
      habits: getFilteredHabits(habitFilters.scheduledForThisMonth),
      key: "month",
    },
  ]

  const visibleSections = rawSections.filter((s) => s.habits.length > 0)
  const firstVisibleKey = visibleSections[0]?.key

  const renderHabitSection = ({
    isFirst,
    habits,
    label,
  }: {
    label: string
    habits: HabitFromBackend[]
    isFirst: boolean
  }) => (
    <>
      <Budge label={label} disableMarginTop={isFirst} />
      {habits.map((h, i) => (
        <View key={h.id}>
          {i === 0 && <View className="border-b border-gray-100" />}
          <HabitCard owner={owner} habit={h} />
          <View className="border-b border-gray-100" />
        </View>
      ))}
    </>
  )

  return (
    <View>
      {visibleSections.map((section) =>
        renderHabitSection({
          label: section.label,
          isFirst: section.key === firstVisibleKey,
          habits: section.habits,
        }),
      )}
    </View>
  )
}
