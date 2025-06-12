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

function sortHabits(a: HabitFromBackend, b: HabitFromBackend) {
  if (a.isCompleted !== b.isCompleted) {
    return a.isCompleted ? 1 : -1
  }
  return a.id - b.id
}

export default function TodoSection({ habits, owner }: Props) {
  const { showCompletedHabits } = useShowCompletedHabitsContext()

  const todayHabits = habits
    .filter(habitFilters.scheduledForToday)
    .filter((h) =>
      showCompletedHabits || owner === "partner" ? true : !h.isCompleted,
    )
    .sort(sortHabits)
  const thisWeekHabits = habits
    .filter(habitFilters.scheduledForThisWeek)
    .filter((h) =>
      showCompletedHabits || owner === "partner" ? true : !h.isCompleted,
    )
    .sort(sortHabits)

  const hasToday = todayHabits.length > 0
  const hasWeek = thisWeekHabits.length > 0

  const isFirstSection = (section: "today" | "week") => {
    if (section === "today") return true
    if (section === "week") return !hasToday
    return false
  }

  return (
    <View>
      {hasToday && (
        <>
          <Budge label="Today" disableMarginTop={isFirstSection("today")} />
          {todayHabits.map((h, i) => (
            <View key={h.id}>
              {i === 0 && <View className="border-b border-gray-100 " />}
              <HabitCard owner={owner} habit={h} />
              <View className="border-b border-gray-100 " />
            </View>
          ))}
        </>
      )}

      {hasWeek && (
        <>
          <Budge label="This Week" disableMarginTop={isFirstSection("week")} />
          {thisWeekHabits.map((h, i) => (
            <View key={h.id}>
              {i === 0 && <View className="border-b border-gray-100 " />}
              <HabitCard owner={owner} habit={h} />
              <View className="border-b border-gray-100 " />
            </View>
          ))}
        </>
      )}
    </View>
  )
}
