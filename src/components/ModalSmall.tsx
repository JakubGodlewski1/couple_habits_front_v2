import { ReactNode } from "react"
import { Modal, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ModalSmall = ({ onClose, isOpen, children }: Props) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}
      >
        <View className="flex-1 items-center justify-center bg-black/50 z-50 ">
          <SafeAreaView className="e p-6 rounded-2xl shadow-lg bg-white ">
            {children}
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  )
}

export default ModalSmall
