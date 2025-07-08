import { View } from "react-native"
import Text from "@/components/Text"
import { useGetRewards } from "@/features/rewards/api/hooks/useGetRewards"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import RewardCard from "@/features/rewards/components/RewardCard"
import AddRewardBtn from "@/features/rewards/components/addRewardBtn"

type Props = {
  selectedTab: RewardsMainTabsKey
  moveToPurchasedTab: () => void
}

export default function RewardsDisplay({
  selectedTab,
  moveToPurchasedTab,
}: Props) {
  const { isPending, data, error } = useGetRewards()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  const { store, purchased } = data!

  if (store.length === 0 && purchased.length === 0)
    return <NoRewards type="no created" />
  if (selectedTab === "purchased" && purchased.length === 0)
    return <NoRewards type="no purchased" />

  const cardsToShow =
    selectedTab === "purchased"
      ? [...purchased].sort((a, b) => Number(a.isUsed) - Number(b.isUsed))
      : store

  return (
    <View>
      {selectedTab === "store" && <AddRewardBtn type="standard" />}
      <View className="flex-row flex-wrap px-1 mt-1">
        {cardsToShow.map((reward, i) => (
          <View
            key={reward.id}
            className={`w-1/2 mb-4 ${i === 0 ? "pr-2" : "pl-2"}`}
          >
            <RewardCard
              moveToPurchasedTab={moveToPurchasedTab}
              reward={reward}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

//show when user has not created any rewards yet
const NoRewards = ({ type }: { type: "no purchased" | "no created" }) => {
  return (
    <View className="px-4 items-center gap-4 my-auto pb-32">
      <Text type="h3" className="text-center mt-10 mx-4">
        {type === "no purchased"
          ? "You have not purchased any rewards yet. Buy one to see it here."
          : "You have not created any rewards yet. Add one to see it here."}
      </Text>
      {type === "no created" && <AddRewardBtn />}
    </View>
  )
}
