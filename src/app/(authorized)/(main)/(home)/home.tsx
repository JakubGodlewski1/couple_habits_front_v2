import SafeAreaWrapper from "../../../../components/SafeAreaWrapper"
import HabitsTabs from "../../../../features/habits/components/habitsForm/HabitsTabs"
import { useState } from "react"
import { Image, View } from "react-native"
import Avatar from "../../../../features/avatar/components/Avatar"
import Text from "../../../../components/Text"
import coupleHighFive from "../../../../assets/illustrations/couple-high-five.png"
import GoToAddPartnerPageBtn from "../../../../features/addPartner/components/GoToAddPartnerPageBtn"
import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import HomeStatsBar from "@/features/stats/components/HomeStatsBar"
import IsLoading from "@/components/IsLoading"
import HabitsDisplay from "@/features/habits/components/HabitsDisplay/HabitsDisplay"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export default function Home() {
  const [currentTab, setCurrentTab] = useState<HabitStateTab>("todo")
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsLoading />

  return (
    <SafeAreaWrapper className="gap-3">
      <HomeStatsBar isDisabled={!user!.hasPartner} />
      <HabitsTabs
        options={HABIT_STATE_TABS}
        onPress={setCurrentTab}
        value={currentTab}
      />
      <View className="bg-white rounded-t-main border-main flex-1 p-2 border-b-0">
        {/*<View className=" absolute bg-gray-200 w-[1px] h-full right-1/2 -translate-x-1/2 mr-2" />*/}
        <View className="flex-row justify-around mb-6 mt-4">
          <Avatar type="user" />
          <Avatar type="partner" />
        </View>
        {user!.hasPartner ? (
          <HabitsDisplay currentTab={currentTab} />
        ) : (
          <NotConnectedDisplay />
        )}
      </View>
    </SafeAreaWrapper>
  )
}

const NotConnectedDisplay = () => {
  const { user } = useGetUser()

  return (
    <View className="gap-1 items-center grow justify-between">
      <View />
      <View className="items-center gap-4">
        <Image
          resizeMode="contain"
          className="w-[55vw] h-[40vw]"
          source={coupleHighFive}
        />
        <Text type="h3" className="text-center">
          Connect with {user!.partnerName} {"\n"} to add habits
        </Text>
      </View>
      <GoToAddPartnerPageBtn />
      <View className="h-24" />
    </View>
  )
}
