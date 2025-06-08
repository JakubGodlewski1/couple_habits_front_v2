import { View } from "react-native"
import Checkbox from "../../../../components/Checkbox"
import { HabitFromBackend } from "../../types/habitCard"
import SwapeableHabitCardWrapper from "./components/SwapeableHabitCardWrapper"
import Text from "@/components/Text"
import { useToggleHabit } from "@/features/habits/api/hooks/useToggleHabit"
import PressableHabitCardWrapper from "@/features/habits/components/habitCard/components/PressableHabitCardWrapper"
import { DAYS_OF_THE_WEEK } from "@/consts/consts"

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
      <View className="border-[1px] rounded-xl p-1 border-subtle">
        <SwapeableHabitCardWrapper
          isDisabled={owner === "partner"}
          habit={habit}
        >
          <View className="flex-1 justify-between bg-white p-2 h-[92px] shadow-lg rounded-xl">
            <Text type="sm" className="ml-2">
              {habit.label}
            </Text>
            <View className="flex-row justify-between">
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
              <View className="flex-row gap-2 items-end ml-auto">
                {habit.frequency.type === "specificDays" &&
                  toggleHidden &&
                  DAYS_OF_THE_WEEK.map((day) => {
                    const isActive = habit.frequency.value.includes(day)
                    return (
                      <View
                        key={day}
                        className={`rounded-full h-6 w-6 items-center justify-center border ${isActive ? "bg-primary border-primary" : "bg-white border-[#D7D7D7]"} `}
                      >
                        <Text
                          className={`text-xs font-bold ${isActive ? "text-white " : "text-[#D7D7D7]"}`}
                        >
                          {day.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )
                  })}
              </View>
            </View>
          </View>
        </SwapeableHabitCardWrapper>
      </View>
    </PressableHabitCardWrapper>
  )
}
