import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { ReactNode } from "react"
import Text from "@/components/Text"
import { View } from "react-native"
import AddHabitBtn from "@/features/habits/components/AddHabitBtn"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { habitFilters } from "@/features/habits/filters/filters"
import { useShowCompletedHabitsContext } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"

type Props = {
  owner: "partner" | "user"
  habits: HabitFromBackend[]
  currentTab: HabitStateTab
  children: ReactNode
}

const Message = ({ label }: { label: string }) => (
  <Text type="h3" className="text-center mt-10 mx-4">
    {label}
  </Text>
)

export default function MessageWhenNoHabits({
  currentTab,
  children,
  habits,
  owner,
}: Props) {
  const user = useGetUser().user!
  const { showCompletedHabits } = useShowCompletedHabitsContext()

  const labels = {
    noHabits: {
      user: "You have not created any habits yet. Add one to see it here.",
      partner: `${user?.partnerName || "Your partner"} has not created any habits yet.`,
    },
    noCompletedHabits: {
      user: "You have not completed any habits today yet.",
      partner: `${user?.partnerName || "Your partner"} has not completed any habits today yet.`,
    },
    noHabitsForToday: {
      user: "You don't have any habits scheduled for today.",
      partner: `${user?.partnerName || "Your partner"} doesn't have any habits scheduled for today.`,
    },
    allHabitsCompleted: {
      user: "You have completed all habits scheduled for today.",
      partner: `${user?.partnerName || "Your partner"} has completed all habits scheduled for today.`,
    },
  }

  if (habits.length === 0) {
    return (
      <View>
        <Message label={labels.noHabits[owner]} />
        {owner === "user" && <AddHabitBtn />}
      </View>
    )
  }

  const scheduledHabits = habits.filter(
    (h) =>
      habitFilters.scheduledForToday(h) ||
      habitFilters.weekly(h) ||
      habitFilters.monthly(h),
  )

  const completedHabits = scheduledHabits.filter(habitFilters.isCompleted)
  const uncompletedHabits = scheduledHabits.filter(
    (h) => !habitFilters.isCompleted(h),
  )

  // If showCompletedHabits is true AND currentTab is "todo", skip all fallback messages
  if (showCompletedHabits && currentTab === "todo") {
    return children
  }

  // Show fallback messages only when not showing completed habits
  if (currentTab === "todo") {
    if (scheduledHabits.length === 0) {
      return <Message label={labels.noHabitsForToday[owner]} />
    }

    if (uncompletedHabits.length === 0) {
      return <Message label={labels.allHabitsCompleted[owner]} />
    }

    if (completedHabits.length > 0 && uncompletedHabits.length === 0) {
      return <Message label={labels.noCompletedHabits[owner]} />
    }
  }

  return children
}
