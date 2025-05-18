import { View } from "react-native"
import Text from "../../../../../components/Text"

export default function Budge({ label }: { label: string }) {
  return (
    <View
      key={label}
      className="bg-[#F6F6F6] px-4 py-2 rounded-main mx-auto items-center"
    >
      <Text className="text-sm text-center font-main-700">{label}</Text>
    </View>
  )
}
