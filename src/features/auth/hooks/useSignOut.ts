import { useClerk } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { useState } from "react"
import { withWarning } from "@/utils/withWarning"
import { showToast } from "@/utils/showToast"

export const useSignOut = () => {
  const { replace } = useRouter()
  const { signOut: signOutWithClerk } = useClerk()
  const [isLoading, setIsLoading] = useState(false)

  const signOut = async () => {
    setIsLoading(true)
    try {
      await signOutWithClerk()
      replace("/hero")
      // eslint-disable-next-line
    } catch (any) {
      setIsLoading(false)
      showToast({
        type: "error",
        message: "We have a problem...",
        extraMessage: "Something went wrong, try again later.",
      })
    }
  }

  const signOutWithWarning = () =>
    withWarning({
      message: "Are you sure you want to sign out?",
      btnLabel: "Yes",
      onPress: signOut,
    })

  return { signOutWithWarning, signOut, isLoading }
}
