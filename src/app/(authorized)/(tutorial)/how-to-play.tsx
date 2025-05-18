import Text from "../../../components/Text"
import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import { BreadCrumb } from "../../../features/tutorial/components/BreadCrumb"
import HabitCardTutorial from "../../../features/tutorial/components/HabitCardTutorial"
import { exampleHabits } from "../../../features/tutorial/exampleData/exampleHabits"
import { View } from "react-native"
import Button from "../../../components/Button"
import { router } from "expo-router"
import StatsBar from "../../../components/StatsBar"

export default function HowToPlay() {
  return (
    <SafeAreaWrapper>
      <Text type="h1">How to play</Text>
      <View className="gap-10 grow">
        <View>
          <BreadCrumb
            text="Create a shared habit with your partner..."
            number="1"
          />
          <HabitCardTutorial exampleHabit={exampleHabits[0]} />
        </View>
        <View>
          <BreadCrumb text="Both complete your tasks..." number="2" />
          <HabitCardTutorial exampleHabit={exampleHabits[1]} />
        </View>
        <View>
          <BreadCrumb
            text="Trade points for days off without loosing your global strike!"
            number="3"
          />
          <StatsBar strike={12} points={580} />
        </View>
        <Button
          classNames={{ wrapper: "mt-auto" }}
          onPress={() => router.push("/card-details")}
          title="Next"
        ></Button>
      </View>
    </SafeAreaWrapper>
  )
}
