import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Text from "../../../components/Text"
import RewardsPriceTabs from "@/features/rewards/components/RewardsPriceTabs"
import SelectRewardImageBtn from "@/features/rewards/components/SelectRewardImageBtn"
import { useRewardForm } from "@/features/rewards/hooks/useRewardForm"
import { Controller } from "react-hook-form"
import { AntDesign } from "@expo/vector-icons"

type Props = {
  moveToStoreTab: () => void
  onCloseModal: () => void
  id?: number
  defaultValues?: {
    label: string
    imageUrl: string
    price: number
    tab: RewardsPriceTabsKey
  }
}

export default function RewardForm({
  onCloseModal,
  defaultValues,
  id,
  moveToStoreTab,
}: Props) {
  const {
    control,
    imageUrl,
    setImageUrl,
    onCancel,
    handleSubmit,
    isSubmitting,
    price,
    isImageMissing,
    deleteRewardWithConfirmation,
  } = useRewardForm({ onCloseModal, defaultValues, id })

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      contentContainerClassName="gap-3 grow"
    >
      <View className="flex-row justify-between">
        <Text className=" mt-4 mb-[12px]" type="h1">
          {id ? "Update the" : "Create a"} reward
        </Text>
        <TouchableOpacity onPress={onCloseModal} className="p-4 pr-0">
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="gap-3 flex-row items-end">
        <Controller
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <>
              <Input
                errorMessage={errors.label?.message}
                className="flex-1"
                placeholder="Go to the cinema"
                label="Reward name"
                value={value}
                onChangeText={onChange}
              />
              <View className={errors.label?.message ? "mb-[32]" : ""}>
                <SelectRewardImageBtn setUri={setImageUrl} />
              </View>
            </>
          )}
          name="label"
        />
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
        {id ? (
          <Button
            type="error"
            classNames={{ wrapper: "grow" }}
            onPress={() => deleteRewardWithConfirmation(id)}
            title="Delete"
          />
        ) : (
          <Button
            classNames={{
              wrapper: "grow",
            }}
            type="subtle"
            onPress={onCancel}
            title="Cancel"
          />
        )}

        <Button
          disabled={isSubmitting}
          classNames={{
            wrapper: "grow",
          }}
          onPress={() => {
            if (isImageMissing) {
              Alert.alert("Image is missing", "Please select an image")
              return
            } else {
              moveToStoreTab()
              handleSubmit()
            }
          }}
          title={id ? "Update" : "Create"}
        />
      </View>
    </ScrollView>
  )
}
