import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import HabitCard from "@/features/habits/components/habitCard/HabitCard"
import { ScrollView, View } from "react-native"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import Budge from "@/features/habits/components/HabitsDisplay/components/Budge"
import MessageWhenNoHabits from "@/features/habits/components/HabitsDisplay/components/MessageWhenNoHabits"
import {
  budgesByDisplayTab,
  getHabitsByTabs,
} from "@/features/habits/components/HabitsDisplay/helpers/getHabitsByTabs"

export default function HabitsDisplay({
  currentTab,
  owner,
}: {
  currentTab: HabitStateTab
  owner: "partner" | "user"
}) {
  const { data: habits, isError, isLoading } = useGetHabits()

  if (isLoading) return <IsLoading />
  if (isError)
    return (
      <IsError message="We could not load your habits. Try again later. If the problem persists, contact us at contact@couplehabits.com" />
    )

  //get filtered habits by tabs
  const habitsByTabs = getHabitsByTabs(habits![owner])

  return (
    <MessageWhenNoHabits
      owner={owner}
      habitsByTabs={habitsByTabs}
      currentTab={currentTab}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HabitsByBudges
          owner={owner}
          habits={habitsByTabs[currentTab]}
          currentTab={currentTab}
        />
        <View className="h-[75px]"></View>
      </ScrollView>
    </MessageWhenNoHabits>
  )
}

const HabitsByBudges = ({
  currentTab,
  habits,
  owner,
}: {
  habits: HabitFromBackend[]
  currentTab: HabitStateTab
  owner: "partner" | "user"
}) => {
  return budgesByDisplayTab[currentTab].map(({ label, filter }) => {
    const filteredHabits = habits.filter(filter)
    if (filteredHabits.length === 0) return null

    return (
      <View className="gap-2 mb-4" key={label}>
        <Budge label={label} />
        <View className="gap-3.5">
          {filteredHabits
            .sort((a, b) => a.id - b.id)
            .map((habit) => (
              <HabitCard
                owner={owner}
                options={{
                  toggleHidden: currentTab === "all",
                }}
                key={habit.id}
                habit={habit}
              />
            ))}
        </View>
      </View>
    )
  })
}
