import { Controller } from "react-hook-form"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Text from "@/components/Text"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import { useUpdatePartnerNameForm } from "@/features/user/hooks/useUpdatePartnerNameForm"

export default function UpdatePartnerNameForm({
  onSettled,
}: {
  onSettled?: () => void
}) {
  const { control, onSubmit, isPending, errors } = useUpdatePartnerNameForm({
    onSettled,
  })

  return (
    <SafeAreaWrapper>
      <Text type="h3">Update partner&apos;s name</Text>
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
        title="Update"
      />
    </SafeAreaWrapper>
  )
}
