import PartnerPageTabbarBudge from "@/components/tabbar/PartnerTabbarBudge"
import Animated from "react-native-reanimated"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"

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
  const user = useGetUser().user!

  const { setTutorialRef } = useTutorialRefContext()

  return (
    <>
      <PartnerPageTabbarBudge isFocused={isFocused} />
      <View
        ref={(node) => setTutorialRef("partnerTabbar", node)}
        className="flex items-center"
      >
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
