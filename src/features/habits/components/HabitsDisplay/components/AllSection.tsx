import { View } from "react-native"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import Budge from "@/features/habits/components/HabitsDisplay/components/Budge"
import { habitFilters } from "@/features/habits/filters/filters"
import HabitCard from "@/features/habits/components/habitCard/HabitCard"

type Props = {
  habits: HabitFromBackend[]
  owner: "partner" | "user"
}

function sortById(a: HabitFromBackend, b: HabitFromBackend) {
  return a.id - b.id
}

export default function AllSection({ habits, owner }: Props) {
  const dailyHabits = habits.filter(habitFilters.daily).sort(sortById)
  const weeklyHabits = habits
    .filter(habitFilters.scheduledForThisWeek)
    .sort(sortById)
  const specificDaysHabits = habits
    .filter(habitFilters.specificDays)
    .sort(sortById)

  const hasDaily = dailyHabits.length > 0
  const hasWeekly = weeklyHabits.length > 0
  const hasSpecific = specificDaysHabits.length > 0

  const isFirstSection = (section: "daily" | "weekly" | "specific") => {
    if (section === "daily") return true
    if (section === "weekly") return !hasDaily
    if (section === "specific") return !hasDaily && !hasWeekly
    return false
  }

  return (
    <View>
      {hasDaily && (
        <>
          <Budge label="Daily" disableMarginTop={isFirstSection("daily")} />
          {dailyHabits.map((h) => (
            <HabitCard
              key={h.id}
              options={{ toggleHidden: true }}
              owner={owner}
              habit={h}
            />
          ))}
        </>
      )}

      {hasWeekly && (
        <>
          <Budge label="Weekly" disableMarginTop={isFirstSection("weekly")} />
          {weeklyHabits.map((h, i) => (
            <>
              {i === 0 && (
                <View key={h.id} className="border-b border-gray-100 " />
              )}
              <HabitCard
                options={{ toggleHidden: true }}
                owner={owner}
                habit={h}
              />
              <View className="border-b border-gray-100 " />
            </>
          ))}
        </>
      )}

      {hasSpecific && (
        <>
          <Budge
            label="Specific days"
            disableMarginTop={isFirstSection("specific")}
          />
          {specificDaysHabits.map((h, i) => (
            <>
              {i === 0 && (
                <View key={h.id} className="border-b border-gray-100 " />
              )}
              <HabitCard
                options={{ toggleHidden: true }}
                owner={owner}
                habit={h}
              />
              <View className="border-b border-gray-100 " />
            </>
          ))}
        </>
      )}
    </View>
  )
}
