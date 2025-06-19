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
  const sections = [
    {
      key: "daily",
      label: "Daily",
      habits: habits.filter(habitFilters.daily).sort(sortById),
    },
    {
      key: "weekly",
      label: "Weekly",
      habits: habits.filter(habitFilters.scheduledForThisWeek).sort(sortById),
    },
    {
      key: "monthly",
      label: "Monthly",
      habits: habits.filter(habitFilters.scheduledForThisMonth).sort(sortById),
    },
    {
      key: "specific",
      label: "Specific days",
      habits: habits.filter(habitFilters.specificDays).sort(sortById),
    },
  ]

  const visibleSections = sections.filter(
    (section) => section.habits.length > 0,
  )
  const firstVisibleKey = visibleSections[0]?.key

  const renderSection = (
    key: string,
    label: string,
    habits: HabitFromBackend[],
    isFirst: boolean,
  ) => (
    <View key={key}>
      <Budge label={label} disableMarginTop={isFirst} />
      {habits.map((h, i) => (
        <View key={h.id}>
          {i === 0 && <View className="border-b border-gray-100" />}
          <HabitCard owner={owner} habit={h} options={{ toggleHidden: true }} />
          <View className="border-b border-gray-100" />
        </View>
      ))}
    </View>
  )

  return (
    <View>
      {visibleSections.map((section) =>
        renderSection(
          section.key,
          section.label,
          section.habits,
          section.key === firstVisibleKey,
        ),
      )}
    </View>
  )
}
