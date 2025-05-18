import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated"

export const moveRight = (defaultPosition: number) => {
  const postionX = useSharedValue(defaultPosition)

  const onStart = () => {
    postionX.value = withDelay(350, withSpring(-500))
  }

  const onEnd = () => {
    postionX.value = withSpring(0)
  }

  const animatedPosition = useAnimatedStyle(() => ({
    right: postionX.value,
  }))

  return { onStart, onEnd, animatedPosition }
}
