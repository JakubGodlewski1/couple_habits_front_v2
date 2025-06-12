import { View } from "react-native"
import Text from "../../../../../components/Text"

type Props = {
  label: string
  disableMarginTop?: boolean
}

export default function Budge({ label, disableMarginTop }: Props) {
  return (
    <View
      className={` ml-1 ${disableMarginTop ? "mb-4 mt-1" : "my-4"}`}
      key={label}
    >
      <Text className="font-bold">{label}</Text>
    </View>
  )
}
