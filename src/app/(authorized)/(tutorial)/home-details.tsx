import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import StatsBar from "../../../components/StatsBar"
import { View } from "react-native"
import Tabs from "../../../components/Tabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import HabitCardTutorial from "../../../features/tutorial/components/HabitCardTutorial"
import { exampleHabits } from "@/features/tutorial/exampleData/exampleHabits"
import Text from "../../../components/Text"
import { AntDesign } from "@expo/vector-icons"
import Button from "../../../components/Button"
import { router } from "expo-router"
import TutorialAvatar from "@/features/tutorial/components/TutorialAvatar"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export default function HomeDetails() {
  const { user } = useGetUser()

  return (
    <SafeAreaWrapper className="gap-2">
      <View className="h-screen w-screen absolute z-10 bg-black/50" />
      <StatsBar strike={12} points={820} />
      <Tabs options={HABIT_STATE_TABS} onPress={() => {}} value="todo" />
      <View className="z-20  relative">
        <Column direction="left" />
        <Column direction="right" />
        <View className="flex-row justify-around mb-6 mt-4 gap-2 z-20">
          <TutorialAvatar type="user" />
          <TutorialAvatar type="partner" />
        </View>
        <View className="z-20">
          <HabitCardTutorial exampleHabit={exampleHabits[0]} />
        </View>
      </View>
      <Button
        classNames={{
          wrapper: "mt-auto z-50",
        }}
        onPress={() =>
          router.replace(
            user?.partnerName !== "partner"
              ? "/home"
              : "/(authorized)/(onboarding)",
          )
        }
        title="Next"
      />
    </SafeAreaWrapper>
  )
}

//absolute column that contains text with col description
const Column = ({ direction }: { direction: "left" | "right" }) => {
  const left = (
    <Text className="text-center">
      <Text className="font-main800">Your task</Text> (part of your shared
      habit)
      <Text className="font-main800"> and your avatar </Text>
      (You can update it later)
    </Text>
  )

  const right = (
    <Text className="text-center">
      <Text className="font-main800">Your partner’s task</Text> and
      <Text className="font-main800"> their avatar</Text>
    </Text>
  )

  return (
    <View
      className={`flex-1 border-main bg-white/50 z-10 items-center rounded-main h-[110%] w-[49%] p-4 absolute top-0 ${direction === "left" ? "left-0" : "right-0"}`}
    >
      <View className="absolute -bottom-2 w-full">
        <AntDesign
          className="absolute top-[0.5px] left-[50%] -translate-x-1/2"
          name="caretup"
          size={20}
          color="white"
        />
        <View className="top-4 absolute bg-white p-4 left-0 right-0 rounded-main">
          {direction === "left" ? left : right}
        </View>
      </View>
    </View>
  )
}
