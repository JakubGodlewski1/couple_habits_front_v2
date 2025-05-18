import { ScrollView, View } from "react-native"
import { Controller } from "react-hook-form"
import Input from "@/components/Input"
import { useResetPassword } from "@/features/auth/hooks/useResetPassword"
import Button from "@/components/Button"

const ResetPasswordForm = () => {
  const {
    controlEmail,
    onSubmitEmail,
    onSubmitPassword,
    isEmailSubmitting,
    isPasswordSubmitting,
    controlPasswordAndCode,
    step,
  } = useResetPassword()

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      contentContainerClassName="gap-4"
    >
      {step === "request" ? (
        <View className="gap-2" key={1}>
          <Controller
            control={controlEmail}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
                placeholder="amazing@email.com"
                label="Email"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="email"
          />

          <Button
            disabled={isEmailSubmitting}
            onPress={onSubmitEmail}
            title="Get reset code"
          />
        </View>
      ) : (
        <View className="gap-2" key={2}>
          <Controller
            control={controlPasswordAndCode}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                autoCapitalize="none"
                placeholder="123456"
                errorMessage={errors.code?.message}
                label="Code"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="code"
          />
          <Controller
            control={controlPasswordAndCode}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                autoCapitalize="none"
                placeholder="********"
                errorMessage={errors.password?.message}
                label="New password"
                keyboardType="visible-password"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="password"
          />

          <Button
            disabled={isPasswordSubmitting}
            onPress={onSubmitPassword}
            title="Reset password"
          />
        </View>
      )}
    </ScrollView>
  )
}

export default ResetPasswordForm
