import PartnerPageTabbarBudge from "@/components/tabbar/PartnerTabbarBudge"
import Animated from "react-native-reanimated"
import PartnerTabbarAvatar from "@/components/tabbar/PartnerTabbarAvatar"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { View } from "react-native"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

type Props = {
  isFocused: boolean
  animatedIconStyle: any
  animatedTextStyle: any
}

const PartnerTabbarButton = ({
  isFocused,
  animatedIconStyle,
  animatedTextStyle,
}: Props) => {
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsError />
  return (
    <>
      <PartnerPageTabbarBudge isFocused={isFocused} />
      <View className="flex items-center">
        <PartnerTabbarAvatar
          isFocused={isFocused}
          animatedIconStyle={animatedIconStyle}
        />
        <Animated.Text style={animatedTextStyle} className="text-sm">
          {user!.partnerName || "Partner"}
        </Animated.Text>
      </View>
    </>
  )
}

export default PartnerTabbarButton
