import { Alert } from "react-native"

type Props = {
  message: string
  btnLabel: string
  onPress: () => void
}

export const withWarning = ({ message, onPress, btnLabel }: Props) => {
  Alert.alert(message, "", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      style: "destructive",
      text: btnLabel,
      onPress: onPress,
    },
  ])
}
