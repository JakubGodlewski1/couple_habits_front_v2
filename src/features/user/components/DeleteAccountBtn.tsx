import { Platform } from "react-native"
import Button from "@/components/Button"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useDeleteAccount } from "@/features/user/api/hooks/useDeleteAccount"
import { useState } from "react"
import { useSignOut } from "@/features/auth/hooks/useSignOut"

export default function DeleteAccountBtn() {
  const { deleteAccountWithWarning, isPending } = useDeleteAccount()
  const [dangerousAreaOpen, setDangerousAreaOpen] = useState(false)

  return dangerousAreaOpen ? (
    <Button
      disabled={isPending}
      classNames={{
        wrapper: `justify-between ${Platform.OS === "android" ? "mb-10" : "mb-4"}`,
      }}
      iconPosition="right"
      type="error"
      onPress={deleteAccountWithWarning}
      title="Delete account"
    >
      <Ionicons size={24} color="red" name="trash-bin-outline" />
    </Button>
  ) : (
    <Button
      disabled={isPending}
      classNames={{
        wrapper: `justify-between ${Platform.OS === "android" ? "mb-10" : "mb-4"}`,
      }}
      iconPosition="right"
      type="error"
      onPress={() => setDangerousAreaOpen(true)}
      title="Dangerous area"
    >
      <AntDesign name="exclamationcircleo" size={24} color="red" />
    </Button>
  )
}
