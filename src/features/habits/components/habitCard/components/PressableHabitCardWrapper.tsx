import { Animated, Pressable } from "react-native"
import { ReactNode, useRef } from "react"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { useSendRequestSkipHabit } from "@/features/shared/partnerRequests/api/hooks/useSendRequestSkipHabit"

type Props = {
  children: ReactNode
  habit: HabitFromBackend
  isDisabled?: boolean
}

export default function PressableHabitCardWrapper({
  children,
  habit,
  isDisabled,
}: Props) {
  const { skipHabitWithWarning, isPending } = useSendRequestSkipHabit()
  const scale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      tension: 15, // lower = slower
      friction: 20, // higher = less bounce
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 30,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  const onLongPress = () => {
    skipHabitWithWarning(habit.id)
  }

  return (
    <Pressable
      disabled={isDisabled || isPending}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </Pressable>
  )
}
