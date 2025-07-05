import { HabitFromBackend } from "@/features/habits/types/habitCard"
import HabitForm from "@/features/habits/forms/HabitForm"
import Modal from "@/components/Modal"

type Props = {
  onClose: () => void
  isOpen: boolean
  habit: HabitFromBackend
}

export default function UpdateHabitModal({ onClose, isOpen, habit }: Props) {
  const {
    id,
    strike: _st,
    completedCount: _cC,
    createdAt: _cA,
    shared: _sh,
    ...rest
  } = habit

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <HabitForm onCloseModal={onClose} habitId={id} initialData={rest} />
    </Modal>
  )
}
