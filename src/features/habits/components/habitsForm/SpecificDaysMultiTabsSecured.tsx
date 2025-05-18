import { DAYS_OF_THE_WEEK } from "@/consts/consts"
import SpecificDaysMultiTabs from "@/features/habits/components/habitsForm/SpecificDaysMultiTabs"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import IsLoadingProAccount from "@/features/subscriptions/components/IsLoadingProAccount"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

type Props<T> = {
  value: T[]
  onChange: (value: T) => void
}

export default function SpecificDaysMultiTabsSecured({
  onChange,
  value,
}: Props<(typeof DAYS_OF_THE_WEEK)[number]>) {
  const { hasPartner } = useGetUser().user!
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading } = useBuyPro({
    paywallIdentifier: "freemium1/pro-feature",
  })

  if (isLoading) return <IsLoadingProAccount />

  return (
    <SpecificDaysMultiTabs
      onChange={hasProAccess || !hasPartner ? onChange : buyPro}
      value={value}
    />
  )
}
