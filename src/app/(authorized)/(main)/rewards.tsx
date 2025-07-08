import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import RewardsTopBar from "@/features/rewards/components/RewardsTopBar"
import Tabs from "@/components/Tabs"
import { useState } from "react"
import { REWARDS_MAIN_TABS } from "@/features/rewards/consts/rewards.consts"
import { View } from "react-native"
import RewardsDisplay from "@/features/rewards/components/RewardsDisplay"

export default function Rewards() {
  const [selectedTab, setSelectedTab] = useState<RewardsMainTabsKey>("store")

  return (
    <SafeAreaWrapper className="gap-2">
      <RewardsTopBar />
      <Tabs
        options={REWARDS_MAIN_TABS}
        onPress={setSelectedTab}
        value={selectedTab}
      />
      <View className="grow bg-white p-2 rounded-main border-main ">
        <RewardsDisplay
          moveToPurchasedTab={() => setSelectedTab("purchased")}
          selectedTab={selectedTab}
        />
      </View>
    </SafeAreaWrapper>
  )
}
