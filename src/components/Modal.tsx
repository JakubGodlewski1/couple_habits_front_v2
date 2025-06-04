import { Modal as ReactModal, View } from "react-native"
import { ReactNode } from "react"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"

type Props = {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
}

export default function Modal({ onClose, isOpen, children }: Props) {
  return (
    <ReactModal
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      animationType="slide"
      visible={isOpen}
    >
      <SafeAreaWrapper>
        <View className="flex-grow px-2">{children}</View>
      </SafeAreaWrapper>
    </ReactModal>
  )
}
