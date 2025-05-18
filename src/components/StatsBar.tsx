import { View } from "react-native"
import Text from "./Text"

type Props = {
  strike: number | undefined
  points: number | undefined
}

export default function StatsBar({ strike, points }: Props) {
  return (
    <View className="w-full flex-row justify-between p-4 bg-white rounded-main border-main">
      <Text>
        Strike:
        <Text className="font-main800">
          {" "}
          {strike !== undefined ? strike + " days" : "0 days"}
        </Text>
      </Text>
      <Text>
        Points:<Text className="font-main800"> {points ?? "0 days"}</Text>
      </Text>
    </View>
  )
}
