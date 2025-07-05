import { Alert, Image, ScrollView, View } from "react-native"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { router } from "expo-router"
import Text from "../../../components/Text"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import RewardsPriceTabs from "@/features/rewards/components/RewardsPriceTabs"
import { useState } from "react"
import SelectRewardImageBtn from "@/features/rewards/components/SelectRewardImageBtn"

type Props = {
  onCloseModal: () => void
}

export default function RewardForm({ onCloseModal }: Props) {
  const [priceTab, setPriceTab] = useState<RewardsPriceTabsKey>("cheap")
  const [imageUri, setImageUri] = useState<string | undefined>()

  const { setIsHidden } = useHideTabbarContext()

  const onCancel = () => {
    onCloseModal()
    setIsHidden(false)
    router.navigate("/rewards")
  }

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
        <Input
          className="grow"
          placeholder="Go to the cinema  🎬"
          label="Reward name"
          value={""}
          onChangeText={() => {}}
        />
        <SelectRewardImageBtn setUri={setImageUri} />
      </View>
      <View>
        <Text className="mb-2">Price</Text>
        <RewardsPriceTabs value={priceTab} onChange={setPriceTab} />
      </View>

      <View className="flex-1 items-center justify-center relative">
        {imageUri ? (
          <>
            <View className="absolute z-50  bg-white/80 rounded-xl p-4 px-14 gap-2 ">
              <Text className="text-center font-main700">It will cost You</Text>
              <Text type="h1" className="text-primary mb-[0px]">
                720 points
              </Text>
            </View>
            <Image
              className="w-full h-full flex-1 rounded-xl"
              source={{ uri: imageUri }}
            />
          </>
        ) : (
          <SelectRewardImageBtn type="button" setUri={setImageUri} />
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
          classNames={{
            wrapper: "flex-1",
          }}
          onPress={() => {
            if (!imageUri) {
              Alert.alert("Please select an image")
            } else {
              //crate the reward
            }
          }}
          title="Create"
        />
      </View>
    </ScrollView>
  )
}
