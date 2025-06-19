import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import Animated from "react-native-reanimated"
import Text from "@/components/Text"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { habitFilters } from "@/features/habits/filters/filters"

const PartnerTabbarBudge = ({ isFocused }: { isFocused: boolean }) => {
  const { data: habits } = useGetHabits()

  const uncompletedHabitsScheduledForToday = (habits?.partner || [])
    .filter(habitFilters.scheduledForTodayIncludingWeekly)
    .filter(
      (h) =>
        !(h.goalType === "atLeast"
          ? h.targetCount <= h.completedCount
          : h.completedCount <= h.targetCount),
    )

  if (uncompletedHabitsScheduledForToday.length === 0) return null

  return (
    <Animated.View
      className={`absolute -top-2 right-[17px] h-6 w-6 z-50 rounded-full flex items-center justify-center ${isFocused ? "bg-white" : "bg-secondary"}`}
    >
      <Text
        className={`${isFocused ? "text-secondary" : "text-white"} font-bold -mt-0.5 text-[13px]`}
      >
        {uncompletedHabitsScheduledForToday.length}
      </Text>
    </Animated.View>
  )
}
//if user has not connected yet, dont return the budge
const PartnerPageTabbarBudgeWrapper = ({
  isFocused,
}: {
  isFocused: boolean
}) => {
  const user = useGetUser().user!

  if (user.hasPartner && !isFocused)
    return <PartnerTabbarBudge isFocused={isFocused} />
  else return null
}

export default PartnerPageTabbarBudgeWrapper
