import { Image, ScrollView, View } from "react-native"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Text from "../../../components/Text"
import RewardsPriceTabs from "@/features/rewards/components/RewardsPriceTabs"
import SelectRewardImageBtn from "@/features/rewards/components/SelectRewardImageBtn"
import { useRewardForm } from "@/features/rewards/hooks/useRewardForm"
import { Controller } from "react-hook-form"

type Props = {
  onCloseModal: () => void
  id?: number
  defaultValues?: {
    label: string
    imageUrl: string
    price: number
    tab: RewardsPriceTabsKey
  }
}

export default function RewardForm({ onCloseModal, defaultValues, id }: Props) {
  const {
    control,
    imageUrl,
    setImageUrl,
    onCancel,
    handleSubmit,
    isSubmitting,
    price,
  } = useRewardForm({ onCloseModal, defaultValues, id })

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      contentContainerClassName="gap-3 grow"
    >
      <Text className=" mt-4 mb-[12px]" type="h1">
        Create a reward
      </Text>
      <View className="gap-3 flex-row items-end">
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              className="grow"
              placeholder="Go to the cinema  🎬"
              label="Reward name"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="label"
        />

        <SelectRewardImageBtn setUri={setImageUrl} />
      </View>
      <View>
        <Text className="mb-2">Price</Text>
        <Controller
          render={({ field: { value, onChange } }) => {
            return <RewardsPriceTabs value={value} onChange={onChange} />
          }}
          name="tab"
          control={control}
        />
      </View>

      <View className="flex-1 items-center justify-center relative">
        {imageUrl ? (
          <>
            <View className="absolute z-50  bg-white/80 rounded-xl p-4 px-14 gap-2 ">
              <Text className="text-center font-main700">It will cost You</Text>
              <Text type="h1" className="text-primary mb-[0px]">
                {price} points
              </Text>
            </View>
            <Image
              className="w-full h-full flex-1 rounded-xl"
              source={{ uri: imageUrl }}
            />
          </>
        ) : (
          <SelectRewardImageBtn type="button" setUri={setImageUrl} />
        )}
      </View>

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
          disabled={isSubmitting}
          classNames={{
            wrapper: "flex-1",
          }}
          onPress={handleSubmit}
          title="Create"
        />
      </View>
    </ScrollView>
  )
}
