import { TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import UpdateHabitModal from "@/features/habits/modals/UpdateHabitModal"
import { useState } from "react"
import { useDeleteHabit } from "@/features/habits/api/hooks/useDeleteHabit"
import { vibrate } from "@/utils/vibrate"

type Props = {
  closeHabitCard: () => void
  habit: HabitFromBackend
}

const MenuContainer = ({ habit, closeHabitCard }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { deleteHabitWithWarning } = useDeleteHabit()
  const [containerHeight, setContainerHeight] = useState(0)

  return (
    <>
      <UpdateHabitModal
        habit={habit}
        onClose={() => setIsModalVisible(false)}
        isOpen={isModalVisible}
      />
      <View
        className="flex-row bg-white border-y-[1px] border-gray-100"
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          setContainerHeight(height)
        }}
      >
        <TouchableOpacity
          onPress={() => {
            vibrate()
            setIsModalVisible(true)
            closeHabitCard()
          }}
          style={{ width: containerHeight }}
          className="bg-tertiary items-center justify-center "
        >
          <Feather color="white" size={20} name="edit" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            vibrate()
            deleteHabitWithWarning(habit.id)
          }}
          style={{ width: containerHeight }}
          className="bg-primary items-center justify-center"
        >
          <Feather color="white" size={20} name="trash-2" />
        </TouchableOpacity>
        {/* If you want buttons to fill the remaining space horizontally, you can wrap them in another flex view */}
      </View>
    </>
  )
}

export default MenuContainer
