import Toast from "react-native-toast-message"

export const showToast = ({
  type,
  message,
  extraMessage,
}: {
  type: "error" | "success"
  message: string
  extraMessage?: string
}) => {
  Toast.show({
    type,
    text1: message,
    text1Style: {
      fontFamily: "Quicksand-SemiBold",
      fontSize: 15,
    },
    text2: extraMessage,
  })
}
