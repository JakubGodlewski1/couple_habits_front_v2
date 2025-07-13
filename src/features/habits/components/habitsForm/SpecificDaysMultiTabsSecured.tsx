import { DAYS_OF_THE_WEEK } from "@/consts/consts"
import SpecificDaysMultiTabs from "@/features/habits/components/habitsForm/SpecificDaysMultiTabs"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import IsLoadingProAccount from "@/features/subscriptions/components/IsLoadingProAccount"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

type Props<T> = {
  value: T[]
  onChange: (value: T) => void
}

export default function SpecificDaysMultiTabsSecured({
  onChange,
  value,
}: Props<(typeof DAYS_OF_THE_WEEK)[number]>) {
  const { isPending: isFeatureFlagsLoading, data: featureFlags } =
    useGetFeatureFlags()

  const user = useGetUser().user
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading } = useBuyPro({
    paywallIdentifier: "freemium1/premium-feature",
  })

  if (isLoading || isFeatureFlagsLoading) return <IsLoadingProAccount />

  const shouldAllow =
    (featureFlags && !featureFlags.isPaywallEnabled) ||
    hasProAccess ||
    !user?.hasPartner

  return (
    <SpecificDaysMultiTabs
      onChange={shouldAllow ? onChange : buyPro}
      value={value}
    />
  )
}
