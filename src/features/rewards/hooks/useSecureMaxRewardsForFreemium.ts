import { useGetRewards } from "@/features/rewards/api/hooks/useGetRewards"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"

export const useSecureMaxRewardsForFreemium = () => {
  const { data, isLoading: isRewardLoading } = useGetRewards()

  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading: isLoadingProAccount } = useBuyPro({
    paywallIdentifier: "freemium1/rewards-limit",
  })

  const isLoading = isLoadingProAccount || isRewardLoading

  const callIfAllowed = (cb: () => void) => {
    if (hasProAccess || (data && data.store.length < 2)) {
      cb()
    } else buyPro()
  }

  return { callIfAllowed, isLoading }
}
