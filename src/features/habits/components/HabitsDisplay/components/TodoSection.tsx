import { View, Text } from "react-native"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import Budge from "@/features/habits/components/HabitsDisplay/components/Budge"
import { habitFilters } from "@/features/habits/filters/filters"
import HabitCard from "@/features/habits/components/habitCard/HabitCard"

type Props = {
  habits: HabitFromBackend[]
  owner: "partner" | "user"
}

function sortHabits(a: HabitFromBackend, b: HabitFromBackend) {
  if (a.isCompleted !== b.isCompleted) {
    return a.isCompleted ? 1 : -1 // incomplete first
  }
  return a.id - b.id
}

export default function TodoSection({ habits, owner }: Props) {
  const todayHabits = habits
    .filter(habitFilters.scheduledForToday)
    .sort(sortHabits)
  const thisWeekHabits = habits
    .filter(habitFilters.scheduledForThisWeek)
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
          {todayHabits.map((h) => (
            <HabitCard key={h.id} owner={owner} habit={h} />
          ))}
        </>
      )}

      {hasWeek && (
        <>
          <Budge label="This Week" disableMarginTop={isFirstSection("week")} />
          {thisWeekHabits.map((h) => (
            <HabitCard key={h.id} owner={owner} habit={h} />
          ))}
        </>
      )}

      {!hasToday && !hasWeek && (
        <Text className="text-center text-gray-400 mt-4">
          You have no habits to complete
        </Text>
      )}
    </View>
  )
}
