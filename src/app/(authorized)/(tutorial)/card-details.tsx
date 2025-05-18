import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import Text from "../../../components/Text"
import { BreadCrumb } from "../../../features/tutorial/components/BreadCrumb"
import { View } from "react-native"
import HabitCardTutorial from "../../../features/tutorial/components/HabitCardTutorial"
import { exampleHabits } from "../../../features/tutorial/exampleData/exampleHabits"
import Button from "../../../components/Button"
import { router } from "expo-router"

export default function CardDetails() {
  return (
    <SafeAreaWrapper>
      <Text type="h1">Card details</Text>
      <View className="gap-10 grow">
        <View>
          <BreadCrumb
            text="Swipe left to either delete or update the habit"
            number="1"
          />
          <HabitCardTutorial
            animateSwipe="right"
            exampleHabit={exampleHabits[0]}
          />
        </View>
        <View>
          <BreadCrumb text="Swipe right to see the habit's stats" number="2" />
          <HabitCardTutorial
            animateSwipe="left"
            exampleHabit={exampleHabits[0]}
          />
        </View>
        <Button
          classNames={{ wrapper: "mt-auto" }}
          onPress={() => router.push("/home-details")}
          title="Next"
        ></Button>
      </View>
    </SafeAreaWrapper>
  )
}
