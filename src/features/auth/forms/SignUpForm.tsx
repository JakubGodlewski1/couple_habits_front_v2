import { ScrollView } from "react-native"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import Input from "@/components/Input"
import Button from "@/components/Button"
import DividerOr from "@/features/auth/components/DividerOr"
import GoogleButton from "@/features/auth/components/GoogleButton"
import AppleButton from "@/features/auth/components/AppleButton"
import LinkToAnotherAuth from "@/features/auth/components/LinkToAnotherAuth"
import Text from "@/components/Text"
import { useSignUp } from "@/features/auth/hooks/useSignUp"
import { Controller } from "react-hook-form"

export default function SignUpForm() {
  const {
    OAuth,
    isSecondFaze,
    errors,
    control,
    isLoading,
    onSubmitSecondFaze,
    onSubmitFirstFaze,
    code,
  } = useSignUp()

  return (
    <SafeAreaWrapper>
      <Text className="mb-2" type="h1">
        Sign up
      </Text>

      {!isSecondFaze ? (
        <ScrollView
          keyboardShouldPersistTaps="never"
          contentContainerClassName="gap-4"
        >
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
                placeholder="amazing@email.com"
                label="Email"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                autoCapitalize="none"
                placeholder="********"
                errorMessage={errors.password?.message}
                label="Password"
                keyboardType="visible-password"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                autoCapitalize="none"
                errorMessage={errors.passwordConfirmation?.message}
                placeholder="********"
                label="Password confirmation"
                keyboardType="visible-password"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="passwordConfirmation"
          />

          <Button
            disabled={isLoading}
            testID="sign-up-btn"
            onPress={onSubmitFirstFaze}
            title="Sign up"
          />
          <DividerOr />
          <GoogleButton isDisabled={isLoading} onPress={OAuth.google} />
          <AppleButton isDisabled={isLoading} onPress={OAuth.apple} />
        </ScrollView>
      ) : (
        <ScrollView keyboardShouldPersistTaps={false}>
          <Input
            keyboardType="numeric"
            autoCapitalize="none"
            errorMessage={code.error || undefined}
            label="We've sent a confirmation code to your email"
            className="mb-2"
            value={code.value}
            onChangeText={(value) => {
              code.onChange(value)
              if (code.error) code.resetError()
            }}
            placeholder="954329"
          />
          <Button
            disabled={isLoading}
            title="Verify Email"
            onPress={onSubmitSecondFaze}
          />
        </ScrollView>
      )}
      {!isSecondFaze && (
        <LinkToAnotherAuth isDisabled={isLoading} href="/sign-in" />
      )}
    </SafeAreaWrapper>
  )
}
