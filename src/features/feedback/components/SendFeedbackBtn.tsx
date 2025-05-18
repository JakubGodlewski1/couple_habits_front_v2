import { MaterialIcons } from "@expo/vector-icons"
import Button from "@/components/Button"
import { View } from "react-native"
import FeedbackModal from "@/features/feedback/components/FeedbackModal"
import { useState } from "react"

export default function SendFeedbackBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <View>
      <FeedbackModal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />
      <Button
        classNames={{ wrapper: `justify-between` }}
        iconPosition="right"
        type="white"
        disabled={false}
        onPress={() => setIsModalOpen(true)}
        title="Send feedback"
      >
        <MaterialIcons name="error-outline" size={24} color="black" />
      </Button>
    </View>
  )
}
