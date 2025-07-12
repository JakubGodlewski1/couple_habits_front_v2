import { View } from "react-native"
import Text from "@/components/Text"
import { useGetStats } from "@/features/stats/api/hooks/useGetStats"

export default function RewardsTopBar() {
  const { stats } = useGetStats()

  return (
    <View className="flex-row gap-4 items-center">
      <Text className="mb-[0px]" type="h1">
        Rewards
      </Text>
      <View className="grow flex-row items-center  bg-white rounded-main border-main p-4 justify-center">
        <Text>
          Points:
          <Text className="font-main800"> {stats?.points ?? "loading..."}</Text>
        </Text>
      </View>
    </View>
  )
}
