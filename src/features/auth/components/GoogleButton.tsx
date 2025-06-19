import { Image } from "react-native"
import logo from "../../../assets/icons/google.png"
import Button from "../../../components/Button"
import { usePostHog } from "posthog-react-native"

type Props = {
  onPress: () => void
  isDisabled?: boolean
}

export default function GoogleButton({ isDisabled = false, onPress }: Props) {
  const postHog = usePostHog()

  const handlePress = () => {
    postHog.capture("signup", { method: "google" })
    onPress()
  }

  return (
    <Button
      disabled={isDisabled}
      iconPosition="left"
      type="white"
      onPress={handlePress}
      title="Continue with Google"
    >
      <Image className="w-6 h-6" source={logo} />
    </Button>
  )
}
