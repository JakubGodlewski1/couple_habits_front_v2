import { Image } from "react-native"
import logo from "../../../assets/icons/google.png"
import Button from "../../../components/Button"

type Props = {
  onPress: () => void
  isDisabled?: boolean
}

export default function GoogleButton({ isDisabled = false, onPress }: Props) {
  return (
    <Button
      disabled={isDisabled}
      iconPosition="left"
      type="white"
      onPress={onPress}
      title="Continue with Google"
    >
      <Image className="w-6 h-6" source={logo} />
    </Button>
  )
}
