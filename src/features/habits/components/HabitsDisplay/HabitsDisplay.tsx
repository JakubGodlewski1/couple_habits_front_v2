import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { ScrollView, View } from "react-native"
import TodoSection from "@/features/habits/components/HabitsDisplay/components/TodoSection"
import AllSection from "@/features/habits/components/HabitsDisplay/components/AllSection"
import MessageWhenNoHabits from "@/features/habits/components/HabitsDisplay/components/MessageWhenNoHabits"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

export default function HabitsDisplay({
  currentTab,
  owner,
}: {
  currentTab: HabitStateTab
  owner: "partner" | "user"
}) {
  const { data: habits, isLoading, isError } = useGetHabits()

  if (isLoading) return <IsLoading />
  if (isError) return <IsError />

  return (
    <MessageWhenNoHabits
      owner={owner}
      habits={habits![owner]}
      currentTab={currentTab}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentTab === "todo" ? (
          <TodoSection habits={habits![owner]} owner={owner} />
        ) : (
          <AllSection habits={habits![owner]} owner={owner} />
        )}
        <View className="h-[75px]"></View>
      </ScrollView>
    </MessageWhenNoHabits>
  )
}
