import { View, Alert } from "react-native"
import Checkbox from "@/components/Checkbox"
import SelectTime from "@/features/habits/components/habitsForm/SelectTime"
import { useState } from "react"
import { useNotifications } from "@/features/shared/notifications/hooks/useNotifications"

type Props = {
  setIsReminderOn: (isOn: boolean) => void
  isReminderOn: boolean
  time: Date
  setTime: (date: Date) => void
}

export default function SetReminder({
  isReminderOn,
  setIsReminderOn,
  setTime,
  time,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const { requestPermissions } = useNotifications()

  const enableReminder = async () => {
    const { status } = await requestPermissions()
    if (status === "granted") {
      setIsReminderOn(true)
      return true
    } else {
      Alert.alert(
        "Enable Notifications",
        "To use reminders, enable notifications in Settings.",
        [{ text: "OK" }],
      )
      setIsReminderOn(false)
      return false
    }
  }

  const handleToggleReminder = async () => {
    if (isReminderOn) {
      setIsReminderOn(false)
      setIsVisible(false)
    } else {
      await enableReminder()
    }
  }

  const handleTimeChange = async (date: Date) => {
    const wasGranted = await enableReminder()
    console.log({ wasGranted })
    if (wasGranted) {
      setTime(date)
    }
  }

  return (
    <View className="flex-row gap-4 justify-between">
      <View className="flex flex-row items-center">
        <Checkbox onPress={handleToggleReminder} isChecked={isReminderOn}>
          Set reminder
        </Checkbox>
      </View>
      <SelectTime
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        time={time}
        setTime={handleTimeChange}
      />
    </View>
  )
}
