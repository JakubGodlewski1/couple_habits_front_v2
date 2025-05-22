import { View } from "react-native"
import Checkbox from "../../../../components/Checkbox"
import { HabitFromBackend } from "../../types/habitCard"
import SwapeableHabitCardWrapper from "./components/SwapeableHabitCardWrapper"
import Text from "@/components/Text"
import { useToggleHabit } from "@/features/habits/api/hooks/useToggleHabit"

type Props = {
  owner: "partner" | "user"
  habit: HabitFromBackend
  options?: {
    toggleHidden?: boolean
  }
}

export default function HabitCard({
  owner,
  habit,
  options: { toggleHidden } = { toggleHidden: false },
}: Props) {
  const { toggleHabit, isPending } = useToggleHabit()

  const isReadOnly = owner === "partner" || toggleHidden

  return (
    <View
      className={`border-[1px] rounded-xl p-1 border-subtle
       `}
    >
      <SwapeableHabitCardWrapper isDisabled={owner === "partner"} habit={habit}>
        <View className="flex-1 bg-white p-2 h-[92px] shadow-lg rounded-xl">
          <Text type="sm" className="ml-2">
            {habit.label}
          </Text>
          {!isReadOnly && (
            <Checkbox
              onPress={(checked) => {
                toggleHabit({
                  isCompleted: checked,
                  id: habit.id,
                })
              }}
              className="mr-auto mt-auto"
              disabled={isPending}
              isChecked={habit.isCompleted}
            />
          )}
        </View>
      </SwapeableHabitCardWrapper>
    </View>
  )
}
