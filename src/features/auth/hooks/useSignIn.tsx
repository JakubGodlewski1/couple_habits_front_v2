import { SignInForm } from "@/features/auth/types/authTypes"
import {
  isClerkAPIResponseError,
  useSignIn as useSignInWithClerk,
} from "@clerk/clerk-expo"
import { useState } from "react"
import { router } from "expo-router"
import Toast from "react-native-toast-message"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInFormSchema } from "@/features/auth/schemas/signInSchema"
import { useOAuth } from "@/features/auth/hooks/useOAuth"
import { showToast } from "@/utils/showToast"

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignInWithClerk()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  const { startAuth: startGoogleAuth, isLoading: isGoogleOAthLoading } =
    useOAuth({ strategy: "google" })
  const { startAuth: startAppleAuth, isLoading: isAppleOAthLoading } = useOAuth(
    { strategy: "apple" },
  )

  const onSubmit = async ({ email, password }: SignInForm) => {
    if (!isLoaded) return
    setIsLoading(true)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push("/(authorized)")
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        Toast.show({
          type: "error",
          text1: "We have a problem...",
          text2: "Something went wrong, try again later.",
        })
        console.error(JSON.stringify(signInAttempt, null, 2))
        setIsLoading(false)
      }
    } catch (err: any) {
      showToast({
        type: "error",
        message: "We have a problem...",
        extraMessage: isClerkAPIResponseError(err)
          ? err.message
          : "Something went wrong, try again later.",
      })

      console.error(JSON.stringify(err, null, 2))
      setIsLoading(false)
    }
  }

  return {
    OAuth: {
      google: startGoogleAuth,
      apple: startAppleAuth,
    },
    onSubmit: handleSubmit(onSubmit),
    isLoading: isLoading || isGoogleOAthLoading || isAppleOAthLoading,
    control,
    errors,
  }
}
