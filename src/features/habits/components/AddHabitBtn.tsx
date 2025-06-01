import Button from "@/components/Button"
import HabitForm from "@/features/habits/forms/HabitForm"
import Modal from "@/components/Modal"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"

export default function AddHabitBtn(
  { iconType }: { iconType?: boolean } = { iconType: false },
) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {iconType ? (
        <IconButton openModal={() => setIsModalOpen(true)} />
      ) : (
        <ButtonWithText openModal={() => setIsModalOpen(true)} />
      )}
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <HabitForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}

const ButtonWithText = ({ openModal }: { openModal: () => void }) => {
  return (
    <Button
      classNames={{
        wrapper: "mx-auto mt-5 py-3",
      }}
      onPress={openModal}
      title="Add your first habit"
    />
  )
}

const IconButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <TouchableOpacity
      onPress={openModal}
      className="absolute -top-20 right-0 bg-primary p-4 rounded-full shadow-lg"
    >
      <AntDesign name="plus" size={28} color="#fff" />
    </TouchableOpacity>
  )
}
