import { TouchableOpacity } from "react-native"
import Text from "../../../components/Text"
import { vibrate } from "@/utils/vibrate"

type Props = {
  setSelectedLabel: (label: string) => void
  label: string
  onClose: () => void
}

export default function IdeaCard({ label, setSelectedLabel, onClose }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        vibrate()
        setSelectedLabel(label)
        onClose()
      }}
      className="bg-white flex-1 p-4 rounded-main items-center justify-center border-main"
    >
      <Text className="shrink text-center leading-7">{label}</Text>
    </TouchableOpacity>
  )
}
