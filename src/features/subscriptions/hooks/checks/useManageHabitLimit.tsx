import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"

export const useManageHabitLimit = () => {
  const habits = useGetHabits().data!
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading: isProLoading } = useBuyPro({
    paywallIdentifier: "freemium1/habit-limit-exceeded",
  })

  const showPaywallIfNeeded = async () => {
    if (!hasProAccess && habits && habits.length > 1) {
      await buyPro()
      return true
    } else return false
  }

  return { showPaywallIfNeeded, isProLoading }
}
