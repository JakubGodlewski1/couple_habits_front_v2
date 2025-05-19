import {
  LayoutChangeEvent,
  Platform,
  TouchableOpacity,
  View,
} from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useEffect, useState } from "react"
import TabbarButton from "./TabbarButton"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useHideTabbarContext } from "../../contexts/HideTabbar"
import { AntDesign, Ionicons } from "@expo/vector-icons"

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
  const [buttonWidth, setButtonWidth] = useState(0)

  const { setIsHidden, animatedPosition } = useHideTabbarContext()

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

  /*tabbar position x*/
  useEffect(() => {
    if (state.routes[state.index].name === "add-habit") {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  }, [state.index])

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
      <TouchableOpacity
        onPress={() => navigation.navigate("add-habit")}
        className="absolute -top-20 right-0 bg-primary p-4 rounded-full shadow-lg"
      >
        <AntDesign name="plus" size={28} color="#fff" />
      </TouchableOpacity>
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
