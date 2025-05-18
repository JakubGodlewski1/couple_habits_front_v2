import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import LinkToAnotherAuth from "@/features/auth/components/LinkToAnotherAuth"
import Text from "@/components/Text"
import ResetPasswordForm from "@/features/auth/forms/ResetPasswordForm"

export default function ResetPassword() {
  return (
    <SafeAreaWrapper>
      <Text className="mb-2" type="h1">
        Reset password
      </Text>
      <ResetPasswordForm />
      <LinkToAnotherAuth href="/sign-up" />
    </SafeAreaWrapper>
  )
}
