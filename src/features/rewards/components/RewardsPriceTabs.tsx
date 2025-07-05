import Tabs from "@/components/Tabs"
import { REWARDS_PRICE_TABS } from "@/features/rewards/consts/rewards.consts"
import { View } from "react-native"
import Text from "@/components/Text"

type Props = {
  onChange: (key: RewardsPriceTabsKey) => void
  value: RewardsPriceTabsKey
}

const hintMap: Record<RewardsPriceTabsKey, string> = {
  cheap: "A small treat for staying on track (~1 week)",
  expensive: "A meaningful reward for sticking with it (~3-4 weeks)",
  luxury: "A big reward for long-term dedication (~3 months)",
}

export default function RewardsPriceTabs({ onChange, value }: Props) {
  return (
    <View>
      <Tabs options={REWARDS_PRICE_TABS} onPress={onChange} value={value} />
      <Text type="sm">{hintMap[value]}</Text>
    </View>
  )
}
