import { Image } from "react-native"
import logo from "../../../assets/icons/apple.png"
import Button from "../../../components/Button"

type Props = {
  onPress: () => void
  isDisabled?: boolean
}

export default function AppleButton({ isDisabled = false, onPress }: Props) {
  return (
    <Button
      disabled={isDisabled}
      iconPosition="left"
      type="white"
      onPress={onPress}
      title="Continue with Apple"
    >
      <Image className="w-6 h-6" source={logo} />
    </Button>
  )
}
