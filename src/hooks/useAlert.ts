import { useState } from "react"
import { Alert } from "react-native"

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openAlert = (message: string) => {
    if (!isOpen) {
      setIsOpen(true)
      Alert.alert(
        message,
        "",
        [
          {
            text: "Ok",
            onPress: () => setIsOpen(false),
          },
        ],
        {
          onDismiss: () => setIsOpen(false),
        },
      )
    }
  }

  return { openAlert }
}
