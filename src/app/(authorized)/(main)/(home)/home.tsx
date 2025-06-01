import { useState } from "react"
import { Image, View } from "react-native"
import SafeAreaWrapper from "../../../../components/SafeAreaWrapper"
import HabitsTabs from "../../../../features/habits/components/habitsForm/HabitsTabs"
import Text from "../../../../components/Text"
import GoToAddPartnerPageBtn from "../../../../features/addPartner/components/GoToAddPartnerPageBtn"
import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import HomeStatsBar from "@/features/stats/components/HomeStatsBar"
import HabitsDisplay from "@/features/habits/components/HabitsDisplay/HabitsDisplay"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import coupleHighFive from "@/assets/illustrations/couple-high-five.png"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"

export default function Home() {
  const [currentTab, setCurrentTab] = useState<HabitStateTab>("todo")
  const { user, isPending, error } = useGetUser()
  const { setTutorialRef } = useTutorialRefContext()
  if (isPending) return <IsLoading />
  if (error) return <IsError />

  return (
    <SafeAreaWrapper className="gap-2">
      <HomeStatsBar isDisabled={!user!.hasPartner} />
      <HabitsTabs
        options={HABIT_STATE_TABS}
        onPress={setCurrentTab}
        value={currentTab}
      />

      <View
        ref={(node) => setTutorialRef("homeContainer", node)}
        className="flex-1"
      >
        {user!.hasPartner ? (
          <View className="bg-white rounded-t-main border-main p-2 border-b-0 flex-1">
            <HabitsDisplay owner="user" currentTab={currentTab} />
          </View>
        ) : (
          <View className="bg-white rounded-t-main border-main flex-1 p-2 border-b-0">
            <NotConnectedDisplay />
          </View>
        )}
      </View>
    </SafeAreaWrapper>
  )
}

const NotConnectedDisplay = () => {
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

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
