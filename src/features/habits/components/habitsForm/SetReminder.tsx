import { View } from "react-native"
import Checkbox from "@/components/Checkbox"
import SelectTime from "@/features/habits/components/habitsForm/SelectTime"
import { useEffect, useState } from "react"

export default function SetReminder() {
  const [time, setTime] = useState(new Date(Date.now()))
  const [isReminderOn, setIsReminderOn] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isReminderOn) setIsVisible(true)
    else setIsVisible(false)
  }, [isReminderOn])

  return (
    <View className="flex-row gap-4 justify-between">
      <View className="flex flex-row items-center">
        <Checkbox onPress={setIsReminderOn} isChecked={isReminderOn}>
          Set reminder
        </Checkbox>
      </View>
      <SelectTime
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        time={time}
        setTime={setTime}
      />
    </View>
  )
}
