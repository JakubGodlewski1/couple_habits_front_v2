import { ScrollView } from "react-native"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import Input from "@/components/Input"
import { Link } from "expo-router"
import Button from "@/components/Button"
import DividerOr from "@/features/auth/components/DividerOr"
import GoogleButton from "@/features/auth/components/GoogleButton"
import AppleButton from "@/features/auth/components/AppleButton"
import LinkToAnotherAuth from "@/features/auth/components/LinkToAnotherAuth"
import Text from "@/components/Text"
import { useSignIn } from "@/features/auth/hooks/useSignIn"
import { Controller } from "react-hook-form"

export default function SignInForm() {
  const { isLoading, control, onSubmit, errors, OAuth } = useSignIn()

  return (
    <SafeAreaWrapper>
      <Text className="mb-2" type="h1">
        Sign in
      </Text>
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
        <Link
          disabled={isLoading}
          className="self-end mr-2 text-tertiary"
          href={"/(unauthorized)/reset-password"}
        >
          Forgot password?
        </Link>

        <Button
          disabled={isLoading}
          testID="sign-in-btn"
          onPress={onSubmit}
          title="Sign in"
        />
        <DividerOr />
        <GoogleButton isDisabled={isLoading} onPress={OAuth.google} />
        <AppleButton isDisabled={isLoading} onPress={OAuth.apple} />
      </ScrollView>
      <LinkToAnotherAuth isDisabled={isLoading} href="/sign-up" />
    </SafeAreaWrapper>
  )
}
