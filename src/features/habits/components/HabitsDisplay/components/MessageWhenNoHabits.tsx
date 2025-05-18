import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { ReactNode } from "react"
import Text from "@/components/Text"
import { View } from "react-native"
import AddHabitBtn from "@/features/habits/components/AddHabitBtn"

type Props = {
  habitsByTabs: Record<HabitStateTab, HabitFromBackend[]>
  currentTab: HabitStateTab
  children: ReactNode
}

const Message = ({ label }: { label: string }) => (
  <Text type="h3" className="text-center mt-10 mx-4">
    {label}
  </Text>
)

export default function MessageWhenNoHabits({
  habitsByTabs,
  currentTab,
  children,
}: Props) {
  //if there are no habits, display appropriate message on the given tab

  //if there are no habits at all
  if (habitsByTabs.all.length === 0) {
    return (
      <View>
        <Message label="You have not created any habits yet. Add one to see it here." />
        <AddHabitBtn />
      </View>
    )
  }

  //if user has not completed any habit yet
  if (habitsByTabs[currentTab].length === 0) {
    if (currentTab === "completed")
      return <Message label="You have not completed any habits today yet." />

    if (currentTab === "todo") {
      //If there are no habits scheduled for today at all
      if (habitsByTabs["completed"].length === 0)
        return <Message label="You don't have any habits scheduled for today" />

      //if user has completed all habits scheduled for today
      return (
        <Message label="You have completed all habits scheduled for today" />
      )
    }
  }

  return children
}
