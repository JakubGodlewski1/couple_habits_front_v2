import { TouchableOpacity, View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Text from "@/components/Text"
import { vibrate } from "@/utils/vibrate"
import { format } from "date-fns"

type Props = {
  time: Date
  setTime: (date: Date) => void
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

export default function SelectTime({
  time,
  setTime,
  isVisible,
  setIsVisible,
}: Props) {
  // Format time to "HH:mm", e.g., "08:30"
  const formattedTime = format(time, "HH:mm")

  return (
    <View className="flex">
      <TouchableOpacity
        onPress={() => {
          vibrate()
          setIsVisible(true)
        }}
        activeOpacity={0.7}
        className="bg-white border-[1px] border-subtle rounded-main items-center px-5 py-2 flex-row"
      >
        <Text>{formattedTime}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        mode="time"
        date={time}
        isVisible={isVisible}
        onConfirm={(date) => {
          setTime(date)
          setIsVisible(false)
        }}
        onCancel={() => {
          setIsVisible(false)
        }}
        is24Hour={true}
      />
    </View>
  )
}
