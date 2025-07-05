import { ScrollView, View } from "react-native"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { router } from "expo-router"
import Text from "../../../components/Text"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import RewardsPriceTabs from "@/features/rewards/components/RewardsPriceTabs"
import { useState } from "react"

type Props = {
  onCloseModal: () => void
}

export default function RewardForm({ onCloseModal }: Props) {
  const [priceTab, setPriceTab] = useState<RewardsPriceTabsKey>("cheap")

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
      contentContainerClassName="gap-5 grow"
    >
      <Text className=" mt-4" type="h1">
        Create a reward
      </Text>
      <View className="gap-4">
        <Input
          placeholder="Go to the cinema  🎬"
          label="Reward name"
          value={""}
          onChangeText={() => {}}
        />
      </View>
      <View>
        <Text className="mb-2">Price</Text>
        <RewardsPriceTabs value={priceTab} onChange={setPriceTab} />
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
          onPress={() => {}}
          title="Create"
        />
      </View>
    </ScrollView>
  )
}
