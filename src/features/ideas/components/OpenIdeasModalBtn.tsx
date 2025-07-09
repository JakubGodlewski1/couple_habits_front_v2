import { TouchableOpacity } from "react-native"
import { useState } from "react"
import Modal from "@/components/Modal"
import { Ionicons } from "@expo/vector-icons"
import Ideas from "@/features/ideas/components/Ideas"

type Props = {
  setSelectedLabel: (label: string) => void
}

export default function OpenIdeasModalBtn({ setSelectedLabel }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        className="bg-white border-[1px] border-subtle rounded-main items-center p-2.5 "
      >
        <Ionicons name="bulb-outline" size={28} color="#4B5563" />
      </TouchableOpacity>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <Ideas
          setSelectedLabel={setSelectedLabel}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}
