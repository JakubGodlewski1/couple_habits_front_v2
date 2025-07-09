import { ScrollView, View } from "react-native"
import Text from "@/components/Text"
import { useGetRewards } from "@/features/rewards/api/hooks/useGetRewards"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import RewardCard from "@/features/rewards/components/RewardCard"
import AddRewardBtn from "@/features/rewards/components/addRewardBtn"

type Props = {
  selectedTab: RewardsMainTabsKey
  setTab: (tab: RewardsMainTabsKey) => void
}

export default function RewardsDisplay({ selectedTab, setTab }: Props) {
  const { isPending, data, error } = useGetRewards()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  const { store, purchased: purchasedAndUsed } = data!

  const purchased = purchasedAndUsed.filter((reward) => !reward.isUsed)
  const used = purchasedAndUsed.filter((reward) => reward.isUsed)

  // Empty state views
  if (store.length === 0 && purchasedAndUsed.length === 0)
    return <NoRewards setTab={setTab} type="no created" />
  if (selectedTab === "purchased" && purchased.length === 0)
    return <NoRewards setTab={setTab} type="no purchased" />
  if (selectedTab === "used" && used.length === 0)
    return <NoRewards setTab={setTab} type="no used" />

  const cardsToShow =
    selectedTab === "store"
      ? store
      : selectedTab === "purchased"
        ? purchased
        : used

  return (
    <ScrollView
      contentContainerClassName="pb-96"
      showsVerticalScrollIndicator={false}
    >
      {selectedTab === "store" && (
        <AddRewardBtn setTab={setTab} type="standard" />
      )}
      <View className="flex-row flex-wrap px-1 mt-1">
        {cardsToShow.map((reward, i) => (
          <View
            key={reward.id}
            className={`w-1/2 mb-4 ${i % 2 === 0 ? "pr-2" : "pl-2"}`}
          >
            <RewardCard setTab={setTab} reward={reward} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const NoRewards = ({
  type,
  setTab,
}: {
  type: "no purchased" | "no created" | "no used"
  setTab: (tab: RewardsMainTabsKey) => void
}) => {
  const messages = {
    "no created":
      "You have not created any rewards yet. Add one to see it here.",
    "no purchased": "Your purchased rewards will show up here.",
    "no used":
      "You have not used any rewards yet. Used rewards will appear here.",
  }

  return (
    <View className="px-4 items-center gap-4 my-auto pb-32">
      <Text type="h3" className="text-center mt-10 mx-4">
        {messages[type]}
      </Text>
      {type === "no created" && <AddRewardBtn setTab={setTab} />}
    </View>
  )
}
