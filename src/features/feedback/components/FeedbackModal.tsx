import { ScrollView } from "react-native"
import Modal from "@/components/Modal"
import Text from "@/components/Text"
import SendFeedbackForm from "@/features/feedback/forms/SendFeedbackForm"

type Props = {
  isModalOpen: boolean
  onCloseModal: () => void
}

export default function FeedbackModal({ isModalOpen, onCloseModal }: Props) {
  return (
    <Modal onClose={onCloseModal} isOpen={isModalOpen}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerClassName="grow"
      >
        <Text type="h1">Send feedback</Text>
        <SendFeedbackForm closeModal={onCloseModal} />
      </ScrollView>
    </Modal>
  )
}
