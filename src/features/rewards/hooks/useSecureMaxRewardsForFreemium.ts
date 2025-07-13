import { useGetRewards } from "@/features/rewards/api/hooks/useGetRewards"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

export const useSecureMaxRewardsForFreemium = () => {
  const { data, isLoading: isRewardLoading } = useGetRewards()

  const { isPending: isFeatureFlagsLoading, data: featureFlags } =
    useGetFeatureFlags()
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading: isLoadingProAccount } = useBuyPro({
    paywallIdentifier: "freemium1/rewards-limit",
  })

  const isLoading =
    isLoadingProAccount || isRewardLoading || isFeatureFlagsLoading

  const callIfAllowed = (cb: () => void) => {
    if (
      hasProAccess ||
      (data && data.store.length < 2) ||
      (featureFlags && !featureFlags.isPaywallEnabled)
    ) {
      cb()
    } else buyPro()
  }

  return { callIfAllowed, isLoading }
}
