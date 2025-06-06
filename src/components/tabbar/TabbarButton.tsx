import { Pressable } from "react-native"
import { ReactNode, useEffect } from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import PartnerTabbarButton from "@/components/tabbar/PartnerTabbarButton"
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types"

const icon: Record<string, (props: { color: string }) => ReactNode> = {
  settings: (props) => (
    <Ionicons {...props} size={28} name="settings-outline" />
  ),
  ideas: (props) => (
    <MaterialCommunityIcons
      size={28}
      {...props}
      name="head-lightbulb-outline"
    />
  ),
  "(home)": (props) => <Ionicons {...props} size={28} name="home-outline" />,
} as const

type Props = {
  testID: string
  onPress: () => void
  onLongPress: () => void
  isFocused: boolean
  routeName: string
  label:
    | string
    | ((props: {
        focused: boolean
        color: string
        position: LabelPosition
        children: string
      }) => ReactNode)
}

export default function TabbarButton({
  testID,
  onPress,
  onLongPress,
  routeName,
  label,
  isFocused,
}: Props) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 })
  }, [scale, isFocused])

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return { opacity }
  })

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [0, 10])

    return { transform: [{ scale: scaleValue }], top }
  })

  return (
    <Pressable
      testID={testID}
      className="flex-col justify-center items-center gap-2 flex-1"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <>
        {routeName === "partner-home" ? (
          <PartnerTabbarButton
            isFocused={isFocused}
            animatedIconStyle={animatedIconStyle}
            animatedTextStyle={animatedTextStyle}
          />
        ) : (
          <>
            <Animated.View style={animatedIconStyle}>
              {icon[routeName]({ color: isFocused ? "white" : "black" })}
            </Animated.View>
            <Animated.Text style={animatedTextStyle} className="text-sm">
              {typeof label === "string" && label}
            </Animated.Text>
          </>
        )}
      </>
    </Pressable>
  )
}
