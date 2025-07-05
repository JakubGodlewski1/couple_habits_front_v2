import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import RewardsTopBar from "@/features/rewards/components/RewardsTopBar"
import Tabs from "@/components/Tabs"
import { useState } from "react"
import { REWARDS_MAIN_TABS } from "@/features/rewards/consts/rewards.consts"
import { View } from "react-native"
import Text from "@/components/Text"
import AddRewardBtn from "@/features/rewards/components/addRewardBtn"

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
        <View className="px-4 items-center gap-4 my-auto pb-32">
          <Text type="h3" className="text-center mt-10 mx-4">
            You have not created any rewards yet. Add one to see it here
          </Text>
          <AddRewardBtn />
        </View>
      </View>
    </SafeAreaWrapper>
  )
}
