import { LayoutChangeEvent, TouchableOpacity, View } from "react-native"
import Text from "./Text"
import { useEffect, useState } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

type Option<T extends string> = {
  key: T
  label: string
}

type Props<T extends string> = {
  options: readonly Option<T>[]
  onPress: (key: T) => void
  value: T
  className?: string
}

export default function Tabs<T extends string>({
  options,
  onPress,
  value,
  className,
}: Props<T>) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
  const [buttonWidth, setButtonWidth] = useState(0)

  useEffect(() => {
    setButtonWidth(dimensions.width / options.length)
  }, [dimensions.width])

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    }
  })

  useEffect(() => {
    const currentTabIndex = options.findIndex((option) => option.key === value)
    tabPositionX.value = withSpring(buttonWidth * currentTabIndex, {
      stiffness: 120,
      damping: 15,
      mass: 1,
    })
  }, [buttonWidth, value])

  return (
    <View
      onLayout={onTabbarLayout}
      className={`flex-row gap-2 justify-evenly bg-white p-2 rounded-main border-main ${className}`}
    >
      <Animated.View
        style={[
          animatedStyle,
          { height: dimensions.height - 16, width: buttonWidth - 16 },
        ]}
        className="absolute bg-primary rounded-main my-2 mx-2 left-0"
      />
      {options.map((option) => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPress(option.key)}
          className={`flex-1 justify-center rounded-main py-2`}
          key={option.key}
        >
          <Text
            className={`text-center ${value === option.key ? "text-white font-main800" : "text-tertiary"}`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
