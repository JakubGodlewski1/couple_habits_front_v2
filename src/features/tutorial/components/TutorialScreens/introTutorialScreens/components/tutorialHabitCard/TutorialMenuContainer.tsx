import { View } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function TutorialMenuContainer() {
  return (
    <View className="flex-row bg-white  border-gray-100 w-32">
      <View className="bg-tertiary items-center justify-center h-full grow">
        <Feather color="white" size={20} name="edit" />
      </View>
      <View className="bg-primary items-center justify-center grow">
        <Feather color="white" size={20} name="trash-2" />
      </View>
    </View>
  )
}
