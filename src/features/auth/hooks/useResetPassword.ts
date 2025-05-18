import { useSignIn } from "@clerk/clerk-expo"
import { useState } from "react"
import { Alert } from "react-native"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  resetPasswordSchemaFazeOne,
  resetPasswordSchemaFazeTwo,
} from "@/features/auth/schemas/ResetPasswordSchema"
import { showToast } from "@/utils/showToast"

export const useResetPassword = () => {
  const { signIn, setActive } = useSignIn()
  const [step, setStep] = useState<"request" | "confirm">("request")

  //email
  const {
    reset: resetEmailInput,
    formState: { isSubmitting: isEmailSubmitting },
    handleSubmit: handleSubmitEmail,
    control: controlEmail,
  } = useForm<{
    email: string
  }>({
    resolver: zodResolver(resetPasswordSchemaFazeOne),
    defaultValues: {
      email: "",
    },
  })

  //code and password
  const {
    formState: { isSubmitting: isPasswordSubmitting },
    handleSubmit: handleSubmitPassword,
    control: controlPasswordAndCode,
  } = useForm<{ code: string; password: string }>({
    resolver: zodResolver(resetPasswordSchemaFazeTwo),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  const requestCode = async ({ email }: { email: string }) => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      setStep("confirm")
      Alert.alert("Success", "Check your email for the reset code.")
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.message || "Something went wrong. Please try again."
      Alert.alert("Error", errorMessage)
    }

    resetEmailInput()
  }

  const confirmReset = async ({
    code,
    password,
  }: {
    code: string
    password: string
  }) => {
    try {
      const { status, createdSessionId } = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })

      if (status === "complete") {
        showToast({
          type: "success",
          message: "Your password has been reset successfully!",
        })
        await setActive!({
          session: createdSessionId,
          redirectUrl: "/(authorized)",
        })
      }
    } catch (err: any) {
      const errorMessage =
        err.errors?.[0]?.message || "Invalid reset code or password."
      Alert.alert("Error", errorMessage)
    }
  }

  return {
    step,
    controlEmail,
    controlPasswordAndCode,
    onSubmitEmail: handleSubmitEmail(requestCode),
    isEmailSubmitting,
    isPasswordSubmitting,
    onSubmitPassword: handleSubmitPassword(confirmReset),
  }
}
