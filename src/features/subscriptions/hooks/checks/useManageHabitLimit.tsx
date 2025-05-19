import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"

export const useManageHabitLimit = () => {
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading: isProLoading } = useBuyPro({
    paywallIdentifier: "freemium1/habit-limit-exceeded",
  })

  const showPaywallIfNeeded = async () => {
    if (!hasProAccess) {
      await buyPro()
      return true
    } else return false
  }

  return { showPaywallIfNeeded, isProLoading }
}
