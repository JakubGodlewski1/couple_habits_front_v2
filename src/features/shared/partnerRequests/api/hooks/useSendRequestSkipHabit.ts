import { useMutate } from "@/api/hooks/useMutate"
import { Alert } from "react-native"
import { withWarning } from "@/utils/withWarning"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetStats } from "@/features/stats/api/hooks/useGetStats"

export const useSendRequestSkipHabit = () => {
  const { user } = useGetUser()
  const { stats } = useGetStats()

  const { create, isPending } = useMutate<CreatePartnerRequest>({
    endpoint: "/partner-requests",
    onSuccess: () => {
      Alert.alert(
        "Request sent",
        "Your partner has to agree for You to skip the habit.",
      )
    },
  })

  const skipHabit = (habitId: number) => {
    if (!user) return
    create({ data: JSON.stringify({ id: habitId }), option: "skipHabit" })
  }

  const validatePoints = () => {
    if (!stats || !stats.points || !user) return { hasEnoughPoints: false }
    else return { hasEnoughPoints: user.habitSkipPrice <= stats.points }
  }

  const skipHabitWithWarning = (id: number) => {
    const { hasEnoughPoints } = validatePoints()
    if (!hasEnoughPoints) {
      return Alert.alert(
        "You Don't have enough points to skip the habit.",
        `You need ${user!.habitSkipPrice} points`,
      )
    }

    withWarning({
      message: `Are you sure you want to skip the habit? It will cost You ${user!.habitSkipPrice} points!`,
      btnLabel: "Skip this habit",
      onPress: () => skipHabit(id),
    })
  }
  return { skipHabitWithWarning, isPending }
}
