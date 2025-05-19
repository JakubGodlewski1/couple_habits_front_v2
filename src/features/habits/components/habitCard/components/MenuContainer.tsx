import { TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import UpdateHabitModal from "@/features/habits/modals/UpdateHabitModal"
import { useState } from "react"

type Props = {
  closeHabitCard: () => void
  habit: HabitFromBackend
}

const MenuContainer = ({ habit, closeHabitCard }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <View className="m-1 ml-2 rounded-r-main gap-1">
      <UpdateHabitModal
        habit={habit}
        onClose={() => setIsModalVisible(false)}
        isOpen={isModalVisible}
      />
      <TouchableOpacity
        onPress={() => {}}
        className="bg-primary rounded-main px-5 flex-1 items-center justify-center"
      >
        <Feather color="white" size={20} name="trash-2" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true)
          closeHabitCard()
        }}
        className="bg-tertiary px-5 flex-1 rounded-main items-center justify-center"
      >
        <Feather color="white" size={20} name="edit" />
      </TouchableOpacity>
    </View>
  )
}

export default MenuContainer
