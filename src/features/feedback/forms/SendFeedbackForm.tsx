import { TouchableOpacity, View } from "react-native"
import Dropdown from "@/components/Dropdown"
import { Controller, useForm } from "react-hook-form"
import { FeedbackFormType } from "@/features/feedback/types/feedback"
import { feedbackFormSchema } from "@/features/feedback/schemas/feedbackFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"
import Button from "@/components/Button"
import { useSendFeedbackForm } from "@/features/feedback/api/hooks/useSendFeedbackForm"
import { FEEDBACK_DROPDOWN_OPTIONS } from "@/features/feedback/consts/feedbackDropdownOptions"

type Props = {
  closeModal: () => void
  setIsEmailInputFocused: (isFocused: boolean) => void
}

export default function SendFeedbackForm({
  closeModal,
  setIsEmailInputFocused,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(feedbackFormSchema),
  })

  const { sendFeedback, isPending } = useSendFeedbackForm({
    onSettled: closeModal,
  })

  const onSubmit = (data: FeedbackFormType) => sendFeedback(data)

  return (
    <View className="grow">
      <View className="gap-5 ">
        <Controller
          defaultValue={FEEDBACK_DROPDOWN_OPTIONS[0].key}
          control={control}
          render={({ field }) => (
            <View>
              <Text className="mb-2">Feedback reason</Text>
              <Dropdown
                onChange={field.onChange}
                value={field.value}
                options={FEEDBACK_DROPDOWN_OPTIONS}
              />
            </View>
          )}
          name="option"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <View>
              <Text className="mb-2">Message</Text>
              <Input
                errorMessage={errors.message?.message}
                placeholder="What would you like to share with us?   (:"
                multiline={true}
                value={field.value}
                onChangeText={field.onChange}
              />
            </View>
          )}
          name="message"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <View>
              <Text className="mb-2">Email</Text>
              <Input
                onFocus={() => setIsEmailInputFocused(true)}
                onBlur={() => setIsEmailInputFocused(false)}
                errorMessage={errors.email?.message}
                placeholder="your@email.com"
                value={field.value || ""}
                onChangeText={field.onChange}
              />
            </View>
          )}
          name="email"
        />

        <Controller
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <TouchableOpacity
              activeOpacity={5}
              onPress={() => field.onChange(!field.value)}
              className="flex-row"
            >
              <View className="flex flex-row max-w-[80%]">
                <Checkbox
                  onPress={() => field.onChange(!field.value)}
                  isChecked={field.value}
                />
                <Text className="text-wrap">
                  I agree to be contacted regarding my feedback.
                </Text>
              </View>
            </TouchableOpacity>
          )}
          name="canBeContacted"
        />
      </View>
      <View className="flex-row gap-4 mt-auto">
        <Button
          classNames={{
            wrapper: "flex-1",
          }}
          type="subtle"
          onPress={closeModal}
          title="Cancel"
        />
        <Button
          disabled={isPending}
          classNames={{
            wrapper: "flex-1",
          }}
          onPress={handleSubmit(onSubmit)}
          title={isPending ? "Sending..." : "Send"}
        />
      </View>
    </View>
  )
}
