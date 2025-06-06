import Button from "@/components/Button"
import { Feather } from "@expo/vector-icons"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

const BuyProBtn = () => {
  const user = useGetUser().user!
  const subscriptionInfo = useGetSubscriptionInfo().subscriptionInfo!
  const featureFlags = useGetFeatureFlags().data!

  const { buyPro, isLoading } = useBuyPro()

  if (
    isLoading ||
    !user.hasPartner ||
    subscriptionInfo.hasProAccess ||
    !featureFlags.isPaywallEnabled
  )
    return

  return (
    <Button
      disabled={!user?.hasPartner}
      type="primary"
      classNames={{
        wrapper: "justify-between",
      }}
      iconPosition="right"
      onPress={buyPro}
      title="I want pro access!"
    >
      <Feather name="star" size={24} color="white" />
    </Button>
  )
}

export default BuyProBtn
