import PartnerPageTabbarBudge from "@/components/tabbar/PartnerTabbarBudge"
import Animated from "react-native-reanimated"
import PartnerTabbarAvatar from "@/components/tabbar/PartnerTabbarAvatar"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Image, View } from "react-native"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import { MaterialCommunityIcons } from "@expo/vector-icons"

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
        <Animated.View className={"mb-1.5"} style={animatedIconStyle}>
          <MaterialCommunityIcons
            color={isFocused ? "white" : "black"}
            name="heart-outline"
            size={28}
          />
        </Animated.View>
        <Animated.Text style={animatedTextStyle} className="text-sm">
          {user!.partnerName || "Partner"}
        </Animated.Text>
      </View>
    </>
  )
}

export default PartnerTabbarButton
