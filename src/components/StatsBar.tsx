import { View } from "react-native"
import Text from "./Text"
import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"

type Props = {
  strike: number | undefined
  points: number | undefined
}

export default function StatsBar({ strike, points }: Props) {
  const { setTutorialRef } = useTutorialRefContext()

  return (
    <View className="w-full flex-row justify-between p-4 bg-white rounded-main border-main">
      <View ref={(node) => setTutorialRef("strike", node)}>
        <Text>
          Strike:
          <Text className="font-main800">
            {" "}
            {strike + (strike === 1 ? " day" : " days")}
          </Text>
        </Text>
      </View>
      <View ref={(node) => setTutorialRef("points", node)}>
        <Text>
          Points:<Text className="font-main800"> {points ?? "0 days"}</Text>
        </Text>
      </View>
    </View>
  )
}
