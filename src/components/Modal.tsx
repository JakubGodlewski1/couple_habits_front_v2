import { Modal as ReactModal, Platform, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ReactNode } from "react"

type Props = {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
}

export default function Modal({ onClose, isOpen, children }: Props) {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <ReactModal
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      animationType="slide"
      visible={isOpen}
    >
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 10 : top + 5,
          marginBottom: bottom + 10,
        }}
        className="flex-grow px-2"
      >
        {children}
      </View>
    </ReactModal>
  )
}
