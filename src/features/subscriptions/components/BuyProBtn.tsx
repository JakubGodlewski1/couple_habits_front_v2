import Button from "@/components/Button"
import { MaterialIcons } from "@expo/vector-icons"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import IsLoadingProAccount from "@/features/subscriptions/components/IsLoadingProAccount"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"

const BuyProBtn = () => {
  const { hasPartner } = useGetUser().user!
  const { buyPro, isLoading } = useBuyPro()
  const { subscriptionInfo } = useGetSubscriptionInfo()

  if (isLoading) return <IsLoadingProAccount />
  if (!hasPartner || subscriptionInfo?.hasProAccess) return

  return (
    <Button
      disabled={!hasPartner}
      type="primary"
      classNames={{
        wrapper: "justify-between",
      }}
      iconPosition="right"
      onPress={buyPro}
      title="Buy premium"
    >
      <MaterialIcons name="workspace-premium" size={24} color="white" />
    </Button>
  )
}

export default BuyProBtn
