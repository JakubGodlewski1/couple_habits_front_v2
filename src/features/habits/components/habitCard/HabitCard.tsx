import { View } from "react-native"
import Checkbox from "../../../../components/Checkbox"
import { HabitFromBackend } from "../../types/habitCard"
import SwapeableHabitCardWrapper from "./components/SwapeableHabitCardWrapper"
import Text from "@/components/Text"
import { useToggleHabit } from "@/features/habits/api/hooks/useToggleHabit"
import PressableHabitCardWrapper from "@/features/habits/components/habitCard/components/PressableHabitCardWrapper"
import SpecificDaysIndicator from "@/features/habits/components/habitCard/components/SpecificDaysIndicator"

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
  const { toggleHabit, isPending } = useToggleHabit()
  const isReadOnly = owner === "partner" || toggleHidden

  return (
    <PressableHabitCardWrapper isDisabled={owner === "partner"} habit={habit}>
      <SwapeableHabitCardWrapper isDisabled={owner === "partner"} habit={habit}>
        <View className="flex-row justify-between items-center py-4 bg-white px-2  shadow-lg">
          {!isReadOnly && (
            <Checkbox
              onPress={(checked) => {
                toggleHabit({
                  action: checked ? "add" : "subtract",
                  id: habit.id,
                })
              }}
              disabled={isPending}
              isChecked={habit.completedCount === 1}
            />
          )}

          <View className="flex-1 ml-2 mr-2">
            <Text
              type="sm"
              className={`flex-shrink text-left ${habit.completedCount === 1 && !toggleHidden ? "line-through" : ""}`}
            >
              {habit.label}
            </Text>
          </View>

          {habit.frequency.type === "specificDays" && toggleHidden && (
            <SpecificDaysIndicator habit={habit} />
          )}
        </View>
      </SwapeableHabitCardWrapper>
    </PressableHabitCardWrapper>
  )
}
