import { Controller } from "react-hook-form"
import { View } from "react-native"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useOnboardingForm } from "@/features/onboarding/hooks/useOnboardingForm"

const OnboardingForm = () => {
  const { control, onSubmit, isPending, errors } = useOnboardingForm()

  return (
    <View>
      <Text type="h1">Before we start...</Text>
      <Text type="h3">
        Provide your partner&apos;s name for more personalized experience
      </Text>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            errorMessage={errors.partnerName?.message}
            className="mt-4"
            placeholder="partner's name"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="partnerName"
      />
      <Button
        disabled={isPending}
        classNames={{
          wrapper: "mt-2",
        }}
        onPress={onSubmit}
        title="Continue"
      />
    </View>
  )
}

export default OnboardingForm
