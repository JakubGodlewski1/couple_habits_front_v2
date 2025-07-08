import { View } from "react-native"
import Text from "@/components/Text"

export default function IsError({ message }: { message?: string }) {
  return (
    <View className="w-full mt-10 flex items-center justify-center">
      <Text type="h3" className="text-center mx-5">
        {message || "Something went wrong"}
      </Text>
    </View>
  )
}
