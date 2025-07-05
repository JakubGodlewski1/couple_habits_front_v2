import { TouchableOpacity } from "react-native"
import Checkbox from "@/components/Checkbox"
import Text from "@/components/Text"
import { vibrate } from "@/utils/vibrate"

type Props = {
  isChecked: boolean
  onPress: (value: boolean) => void
}

export default function CreateSharedHabitCheckbox({
  isChecked,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        vibrate()
        onPress(!isChecked)
      }}
      className="flex-row gap-1 items-center"
    >
      <Checkbox onPress={onPress} isChecked={isChecked} />
      <Text type="sm">Create shared habit</Text>
    </TouchableOpacity>
  )
}
