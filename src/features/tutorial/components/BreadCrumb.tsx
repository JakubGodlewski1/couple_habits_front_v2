import { View } from "react-native"
import Text from "../../../components/Text"

export const BreadCrumb = ({
  text,
  number,
}: {
  text: string
  number: string
}) => {
  return (
    <View className="flex-row space-x-2 mb-2">
      <View className="bg-primary rounded-main h-6 w-6 justify-center items-center mr-2">
        <Text className="text-white -mt-0.5 font-main800">{number}</Text>
      </View>
      <Text className="flex-1">{text}</Text>
    </View>
  )
}
