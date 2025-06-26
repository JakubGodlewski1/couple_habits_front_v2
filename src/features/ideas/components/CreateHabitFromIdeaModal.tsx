import Modal from "@/components/Modal"
import HabitForm from "@/features/habits/forms/HabitForm"
import { HabitFormType } from "@/features/habits/types/habitForm"

type Props = {
  isModalOpen: boolean
  onCloseModal: () => void
  label: string
}

export default function CreateHabitFromIdeaModal({
  label,
  onCloseModal,
  isModalOpen,
}: Props) {
  const defaultHabit: HabitFormType = {
    goalType: "atLeast",
    targetCount: 1,
    label,
    frequency: { type: "repeat", value: "daily" },
  }

  return (
    <Modal onClose={onCloseModal} isOpen={isModalOpen}>
      <HabitForm initialData={defaultHabit} onCloseModal={onCloseModal} />
    </Modal>
  )
}
