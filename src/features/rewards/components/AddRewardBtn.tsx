import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useState } from "react"
import RewardForm from "@/features/rewards/forms/RewardForm"
import { TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"

export default function AddRewardBtn(
  { type = "initial" }: { type?: "initial" | "standard" } = { type: "initial" },
) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {type === "initial" ? (
        <Button
          classNames={{
            wrapper: "mx-auto mt-5 py-3",
          }}
          onPress={() => setIsModalOpen(true)}
          title="Add your first reward"
        />
      ) : (
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          className="border-[1px] bg-white border-primary rounded-lg p-1 items-center mb-2 grow"
        >
          <AntDesign name="plus" size={24} color="#ff786f" />
        </TouchableOpacity>
      )}

      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <RewardForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}
