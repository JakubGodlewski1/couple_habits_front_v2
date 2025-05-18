import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import { Image, Pressable, View } from "react-native"
import error from "@/assets/illustrations/error-page.png"
import Text from "@/components/Text"
import { Linking } from "react-native"

const ErrorBoundaryPage = () => {
  return (
    <SafeAreaWrapper className="bg-white">
      <View className="flex items-center justify-center p-5 h-full gap-10">
        <Text className="text-center" type="h1">
          Uh! Something went wrong!{"\n"}
          {"\n"}
          <Text type="h3">
            If this keeps happening, please contact us at {"\n"}
            <Pressable
              className="flex justify-center  w-full"
              onPress={() => Linking.openURL("mailto:contact@couplehabits.com")}
            >
              <Text type="h3" className="underline text-center">
                contact@couplehabits.com
              </Text>
            </Pressable>
          </Text>
        </Text>

        <Image
          resizeMode="contain"
          className="w-[95vw] h-[90vw]"
          source={error}
        />
      </View>
    </SafeAreaWrapper>
  )
}

export default ErrorBoundaryPage
