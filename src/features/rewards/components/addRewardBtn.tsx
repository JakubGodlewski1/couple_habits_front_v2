import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useState } from "react"
import RewardForm from "@/features/rewards/forms/RewardForm"

export default function AddRewardBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        classNames={{
          wrapper: "mx-auto mt-5 py-3",
        }}
        onPress={() => setIsModalOpen(true)}
        title="Add your first reward"
      />
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <RewardForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}
