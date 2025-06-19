import { Image } from "react-native"
import logo from "../../../assets/icons/apple.png"
import Button from "../../../components/Button"
import { usePostHog } from "posthog-react-native"

type Props = {
  onPress: () => void
  isDisabled?: boolean
}

export default function AppleButton({ isDisabled = false, onPress }: Props) {
  const postHog = usePostHog()

  const handlePress = () => {
    postHog.capture("signup", { method: "apple" })
    onPress()
  }

  return (
    <Button
      disabled={isDisabled}
      iconPosition="left"
      type="white"
      onPress={handlePress}
      title="Continue with Apple"
    >
      <Image className="w-6 h-6" source={logo} />
    </Button>
  )
}
