import { LayoutChangeEvent, Platform } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useEffect, useState } from "react"
import TabbarButton from "./TabbarButton"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import AddHabitBtn from "@/features/habits/components/AddHabitBtn"

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
  const [buttonWidth, setButtonWidth] = useState(0)

  const { animatedPosition } = useHideTabbarContext()

  useEffect(() => {
    setButtonWidth(dimensions.width / state.routes.length)
  }, [dimensions.width])

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  /*tab position x*/
  const tabPositionX = useSharedValue(0)

  const animatedTabPositionX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    }
  })

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1500,
    })
  }, [state.index, buttonWidth])

  return (
    <Animated.View
      style={[
        animatedPosition,
        {
          bottom: Platform.OS === "ios" ? 24 : 10,
          marginHorizontal: Platform.OS === "ios" ? 16 : 8,
        },
      ]}
      onLayout={onTabbarLayout}
      className="flex-row  absolute bg-white py-3 rounded-main shadow-sm border-subtle border-[1px]"
    >
      {state.routes[state.index].name === "(home)" && (
        <AddHabitBtn iconType={true} />
      )}
      <>
        <Animated.View
          style={[
            animatedTabPositionX,
            { height: dimensions.height - 16, width: buttonWidth - 16 },
          ]}
          className="absolute bg-primary rounded-main my-2 mx-2"
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          return (
            <TabbarButton
              testID={route.name}
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label}
            />
          )
        })}
      </>
    </Animated.View>
  )
}
