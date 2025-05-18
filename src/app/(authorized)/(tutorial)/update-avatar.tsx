import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import StatsBar from "../../../components/StatsBar"
import { View } from "react-native"
import Tabs from "../../../components/Tabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import Text from "../../../components/Text"
import { AntDesign } from "@expo/vector-icons"
import Button from "../../../components/Button"
import { router } from "expo-router"
import TutorialAvatar from "@/features/tutorial/components/TutorialAvatar"

export default function UpdateAvatar() {
  return (
    <SafeAreaWrapper className="gap-3">
      <View className="h-screen w-screen absolute z-10 bg-black/50" />
      <StatsBar points={240} strike={12} />
      <Tabs options={HABIT_STATE_TABS} onPress={() => {}} value="todo" />
      <View className="bg-white rounded-t-main border-main flex-1 p-2 border-b-0">
        <View className="flex-row justify-around mb-6 mt-4">
          <View className="z-20">
            <TutorialAvatar type="user" />
            <View className="bottom-0 absolute w-full">
              <View className="absolute top-4 w-[200%] border-main bg-white rounded-main left-1/2 -translate-x-[50%]">
                <AntDesign
                  className="absolute -top-3 left-[50%] -translate-x-1/2"
                  name="caretup"
                  size={20}
                  color="white"
                />
                <Text className="text-center p-4">
                  Click here to update your avatar
                </Text>
              </View>
            </View>
          </View>
          <TutorialAvatar type="partner" />
        </View>
      </View>
      <Button
        classNames={{
          wrapper: "mt-auto z-50",
        }}
        onPress={() => router.replace("/home")}
        title="Next"
      />
    </SafeAreaWrapper>
  )
}
