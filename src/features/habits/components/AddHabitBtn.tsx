import Button from "@/components/Button"
import HabitForm from "@/features/habits/forms/HabitForm"
import Modal from "@/components/Modal"
import { useState } from "react"

export default function AddHabitBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        classNames={{
          wrapper: "mx-auto mt-5 py-3",
        }}
        onPress={() => setIsModalOpen(true)}
        title="Add your first habit"
      />
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <HabitForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}
