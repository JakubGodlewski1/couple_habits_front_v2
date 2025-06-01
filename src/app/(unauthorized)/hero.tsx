import { Image, ScrollView, View } from "react-native"
import couple from "../../assets/illustrations/couple-sorting-habits.png"
import Text from "../../components/Text"
import Button from "../../components/Button"
import { router } from "expo-router"
import SafeAreaWrapper from "../../components/SafeAreaWrapper"

export default function Hero() {
  return (
    <SafeAreaWrapper className="pt-[2vh]">
      <ScrollView contentContainerClassName="justify-between flex-grow">
        <View className="items-center">
          <Text className="text-center" type="h1">
            Them for You, {"\n"}
            You for them. {"\n"}
            Get better together!
          </Text>
          <Text className="-mt-4" type="h3">
            Habit app for couples
          </Text>
        </View>
        <Image
          resizeMode="contain"
          className="mx-auto w-[85vw] h-[400px] max-h-[40vh]"
          source={couple}
        />
        <View />
      </ScrollView>
      <Button
        title="Explore the app"
        onPress={() => router.push("/(unauthorized)/sign-up")}
      />
    </SafeAreaWrapper>
  )
}
