import { View, Text } from "react-native"
import { DAYS_OF_THE_WEEK } from "@/consts/consts"
import { HabitCard } from "@/features/habits/types/habitCard"

type Props = {
  habit: HabitCard
  className?: string
}

export default function SpecificDaysIndicator({ habit, className }: Props) {
  return (
    <View className={`flex-row gap-[3px]  ${className ?? ""}`}>
      {DAYS_OF_THE_WEEK.map((day) => {
        const isActive = habit.frequency.value.includes(day)

        return (
          <View
            key={day}
            className={`rounded-full h-5 w-5 items-center justify-center border ${
              isActive
                ? "bg-primary border-primary"
                : "bg-white border-[#D7D7D7]"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                isActive ? "text-white" : "text-[#D7D7D7]"
              }`}
            >
              {day.charAt(0).toUpperCase()}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
