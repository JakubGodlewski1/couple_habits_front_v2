import { ScrollView } from "react-native"
import Modal from "@/components/Modal"
import Text from "@/components/Text"
import SendFeedbackForm from "@/features/feedback/forms/SendFeedbackForm"
import { useState } from "react"

type Props = {
  isModalOpen: boolean
  onCloseModal: () => void
}

export default function FeedbackModal({ isModalOpen, onCloseModal }: Props) {
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false)

  return (
    <Modal onClose={onCloseModal} isOpen={isModalOpen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName={`h-full  ${isEmailInputFocused ? "-mt-28" : ""}`}
      >
        <Text type="h1">Send feedback</Text>
        <SendFeedbackForm
          setIsEmailInputFocused={setIsEmailInputFocused}
          closeModal={onCloseModal}
        />
      </ScrollView>
    </Modal>
  )
}
