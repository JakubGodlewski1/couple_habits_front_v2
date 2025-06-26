import { TouchableOpacity } from "react-native"
import Text from "../../../components/Text"
import CreateHabitFromIdeaModal from "@/features/ideas/components/CreateHabitFromIdeaModal"
import { useState } from "react"
import { vibrate } from "@/utils/vibrate"

export default function IdeaCard({ label }: { label: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => {
        vibrate()
        setIsModalOpen(true)
      }}
      className="bg-white flex-1 p-4 rounded-main items-center justify-center border-main"
    >
      <CreateHabitFromIdeaModal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        label={label}
      />
      <Text className="shrink text-center leading-7">{label}</Text>
    </TouchableOpacity>
  )
}
