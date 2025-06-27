import { useRef, useState } from "react"
import { Animated, View } from "react-native"
import Checkbox from "../../../../components/Checkbox"
import { HabitFromBackend } from "../../types/habitCard"
import SwapeableHabitCardWrapper from "./components/SwapeableHabitCardWrapper"
import Text from "@/components/Text"
import { useToggleHabit } from "@/features/habits/api/hooks/useToggleHabit"
import PressableHabitCardWrapper from "@/features/habits/components/habitCard/components/PressableHabitCardWrapper"
import SpecificDaysIndicator from "@/features/habits/components/habitCard/components/SpecificDaysIndicator"
import { vibrate } from "@/utils/vibrate"
import { playClickSound } from "@/utils/playPop"
import { useShowCompletedHabitsContext } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"

type Props = {
  owner: "partner" | "user"
  habit: HabitFromBackend
  options?: {
    toggleHidden?: boolean
  }
  onLongPress?: () => void
}

export default function HabitCard({
  owner,
  habit,
  options: { toggleHidden } = { toggleHidden: false },
}: Props) {
  const { showCompletedHabits } = useShowCompletedHabitsContext()
  const { toggleHabit, isPending } = useToggleHabit()
  const isReadOnly = owner === "partner" || toggleHidden

  const opacity = useRef(new Animated.Value(1)).current
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = (checked: boolean) => {
    playClickSound()
    vibrate()
    if (checked) {
      if (showCompletedHabits) {
        toggleHabit({
          action: "add",
          id: habit.id,
        })
        return
      }

      setIsAnimating(true)

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          toggleHabit({
            action: "add",
            id: habit.id,
          })
        })
      }, 200)
    } else {
      toggleHabit({
        action: "subtract",
        id: habit.id,
      })
    }
  }

  return (
    <PressableHabitCardWrapper isDisabled={owner === "partner"} habit={habit}>
      <SwapeableHabitCardWrapper isDisabled={owner === "partner"} habit={habit}>
        <Animated.View
          style={{ opacity }}
          className="flex-row justify-between items-center py-4 bg-white px-2 shadow-lg"
        >
          {!isReadOnly && (
            <Checkbox
              onPress={(checked) => {
                if (!isAnimating) {
                  handleToggle(checked)
                }
              }}
              disabled={isPending}
              isChecked={habit.completedCount === 1 || isAnimating}
            />
          )}

          <View className="flex-1 ml-2 mr-2">
            <Text
              type="sm"
              className={`flex-shrink text-left ${
                habit.completedCount === 1 && !toggleHidden
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {habit.label}
            </Text>
          </View>

          {habit.frequency.type === "specificDays" && toggleHidden && (
            <SpecificDaysIndicator habit={habit} />
          )}
        </Animated.View>
      </SwapeableHabitCardWrapper>
    </PressableHabitCardWrapper>
  )
}
