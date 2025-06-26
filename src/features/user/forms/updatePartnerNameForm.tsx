import { Controller } from "react-hook-form"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Text from "@/components/Text"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import { useUpdatePartnerNameForm } from "@/features/user/hooks/useUpdatePartnerNameForm"
import { View } from "react-native"

export default function UpdatePartnerNameForm({
  onCancel,
}: {
  onCancel: () => void
}) {
  const { control, onSubmit, isPending, errors } = useUpdatePartnerNameForm({
    onSettled: onCancel,
  })

  return (
    <SafeAreaWrapper>
      <Text type="h1">Update partner&apos;s name</Text>
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
      <View className="flex-row gap-4 mt-auto">
        <Button
          classNames={{
            wrapper: "flex-1",
          }}
          type="subtle"
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          disabled={isPending}
          classNames={{
            wrapper: "flex-1",
          }}
          onPress={onSubmit}
          title="Update"
        />
      </View>
    </SafeAreaWrapper>
  )
}
