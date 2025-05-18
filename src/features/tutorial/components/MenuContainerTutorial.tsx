import { View } from "react-native"
import { Feather } from "@expo/vector-icons"

const MenuContainerTutorial = () => {
  return (
    <View className="m-1 ml-2 rounded-r-main gap-1">
      <View className="bg-primary rounded-main px-5 flex-1 items-center justify-center">
        <Feather color="white" size={20} name="trash-2" />
      </View>
      <View className="bg-tertiary px-5 flex-1 rounded-main items-center justify-center">
        <Feather color="white" size={20} name="edit" />
      </View>
    </View>
  )
}

export default MenuContainerTutorial
