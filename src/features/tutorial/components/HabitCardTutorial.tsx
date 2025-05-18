import { View } from "react-native"
import Checkbox from "../../../components/Checkbox"
import Text from "../../../components/Text"
import SwapeableHabitCardTutorialWrapper from "./SwapeableHabitCardTutorialWrapper"

export default function HabitCardTutorial({
  animateSwipe,
  exampleHabit: { user, partner },
}: {
  animateSwipe?: "left" | "right"
  exampleHabit: HabitTutorial
}) {
  return (
    <View className="border-[1px] rounded-xl border-subtle p-1">
      <SwapeableHabitCardTutorialWrapper animateSwipe={animateSwipe}>
        <View className="flex-row shadow">
          <View className="flex-1 bg-white border-r-subtle border-r-[0.5px] p-2 h-[92px] rounded-l-lg pr-3">
            <Text className="text-center">{user.label}</Text>
            <Checkbox
              className="mr-auto mt-auto"
              disabled={true}
              isChecked={user.isCompleted}
              onPress={() => {}}
            />
          </View>
          <View
            className={`flex-1 bg-white border-l-subtle border-l-[0.5px] rounded-r-lg p-2 border-r-error border-r-4
        ${partner.isCompleted ? "border-r-success" : "border-r-error"}`}
          >
            <Text className="text-center">{partner.label}</Text>
          </View>
        </View>
      </SwapeableHabitCardTutorialWrapper>
    </View>
  )
}
