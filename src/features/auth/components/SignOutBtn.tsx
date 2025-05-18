import Button from "@/components/Button"
import { MaterialIcons } from "@expo/vector-icons"
import { useSignOut } from "@/features/auth/hooks/useSignOut"

export default function SignOutBtn() {
  const { signOutWithWarning, isLoading } = useSignOut()

  return (
    <Button
      classNames={{ wrapper: `justify-between mt-auto` }}
      iconPosition="right"
      type="white"
      disabled={isLoading}
      onPress={signOutWithWarning}
      title="Sign out"
    >
      <MaterialIcons size={24} name="logout" />
    </Button>
  )
}
