import { View } from "react-native"
import Checkbox from "../../../../components/Checkbox"
import { HabitFromBackend } from "../../types/habitCard"
import SwapeableHabitCardWrapper from "./components/SwapeableHabitCardWrapper"
import Text from "@/components/Text"
import { useToggleHabit } from "@/features/habits/api/hooks/useToggleHabit"

type Props = {
  habit: HabitFromBackend
  options?: {
    toggleHidden?: boolean
  }
}

export default function HabitCard({
  habit,
  options: { toggleHidden } = { toggleHidden: false },
}: Props) {
  const { toggleHabit, isPending } = useToggleHabit()

  return (
    <View className="border-[1px] rounded-xl border-subtle p-1 shadow-sm">
      <SwapeableHabitCardWrapper habit={habit}>
        <View className="flex-row shadow">
          <View className="flex-1 bg-white border-r-subtle border-r-[0.5px] p-2 h-[92px] rounded-l-lg">
            <Text type="sm" className="text-center">
              {habit.user.label}
            </Text>
            {!toggleHidden && (
              <Checkbox
                onPress={(checked) => {
                  toggleHabit({
                    isCompleted: checked,
                    id: habit.id,
                  })
                }}
                className="mr-auto mt-auto"
                disabled={isPending}
                isChecked={habit.user.isCompleted}
              />
            )}
          </View>
          <View
            className={`flex-1 bg-white border-l-subtle border-l-[0.5px] rounded-r-lg p-2 
             ${
               !toggleHidden
                 ? habit.partner.isCompleted
                   ? "border-r-success border-r-4"
                   : "border-r-error border-r-4"
                 : ""
             }`}
          >
            <Text type="sm" className="text-center">
              {habit.partner.label}
            </Text>
          </View>
        </View>
      </SwapeableHabitCardWrapper>
    </View>
  )
}
