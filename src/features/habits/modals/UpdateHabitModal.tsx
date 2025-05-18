import { HabitFromBackend } from "@/features/habits/types/habitCard"
import HabitForm from "@/features/habits/forms/HabitForm"
import { HabitFormType } from "@/features/habits/types/habitForm"
import Modal from "@/components/Modal"

type Props = {
  onClose: () => void
  isOpen: boolean
  habit: HabitFromBackend
}

export default function UpdateHabitModal({ onClose, isOpen, habit }: Props) {
  const { id, frequency, user, partner } = habit
  const habitToForm: HabitFormType = {
    frequency,
    userLabel: user.label,
    partnerLabel: partner.label,
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <HabitForm
        onCloseModal={onClose}
        habitId={id}
        initialData={habitToForm}
      />
    </Modal>
  )
}
