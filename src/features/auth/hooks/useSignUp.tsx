import { useForm } from "react-hook-form"
import { SignUpForm } from "@/features/auth/types/authTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpFormSchema } from "@/features/auth/schemas/signUpFormSchema"
import { useSignUp as useSIgnUpWithClerk } from "@clerk/clerk-expo"
import { useState } from "react"
import { useRouter } from "expo-router"
import { useOAuth } from "@/features/auth/hooks/useOAuth"
import { showToast } from "@/utils/showToast"

const showClerkErrorToast = (message?: string) => {
  const errorMessage = message || "Something went wrong, try again later"
  showToast({
    type: "error",
    message: "We have a problem...",
    extraMessage: errorMessage,
  })
}

export const useSignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { startAuth: startGoogleAuth, isLoading: isGoogleOAthLoading } =
    useOAuth({ strategy: "google" })
  const { startAuth: startAppleAuth, isLoading: isAppleOAthLoading } = useOAuth(
    {
      strategy: "apple",
    },
  )

  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSIgnUpWithClerk()
  const [isLoading, setIsLoading] = useState(false)
  const [isSecondFaze, setIsSecondFaze] = useState(false)
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState<string | null>(null)

  //first faze
  const onSubmitFirstFaze = async ({ password, email }: SignUpForm) => {
    if (!isLoaded) return

    setIsLoading(true)

    try {
      await signUp.create({
        emailAddress: email,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setIsSecondFaze(true)
    } catch (err: any) {
      showClerkErrorToast(err?.errors[0].message)

      console.error(JSON.stringify(err.errors, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  //second faze
  const onSubmitSecondFaze = async () => {
    if (!isLoaded) return
    if (code.length !== 6)
      return setCodeError("The code must be 6 characters long")

    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace("/(authorized)")
      } else {
        showClerkErrorToast()
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      showClerkErrorToast(err.message)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    OAuth: {
      google: startGoogleAuth,
      apple: startAppleAuth,
    },
    errors,
    isSecondFaze,
    isLoading: isLoading || isGoogleOAthLoading || isAppleOAthLoading,
    control,
    onSubmitFirstFaze: handleSubmit(onSubmitFirstFaze),
    onSubmitSecondFaze,
    code: {
      error: codeError,
      resetError: () => setCodeError(null),
      onChange: (code: string) => setCode(code),
      value: code,
    },
  }
}
