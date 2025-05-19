import { useState } from "react"
import { Dimensions, Image, ScrollView, View } from "react-native"
import SafeAreaWrapper from "../../../../components/SafeAreaWrapper"
import HabitsTabs from "../../../../features/habits/components/habitsForm/HabitsTabs"
import Text from "../../../../components/Text"
import coupleHighFive from "../../../../assets/illustrations/couple-high-five.png"
import GoToAddPartnerPageBtn from "../../../../features/addPartner/components/GoToAddPartnerPageBtn"
import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import HomeStatsBar from "@/features/stats/components/HomeStatsBar"
import IsLoading from "@/components/IsLoading"
import HabitsDisplay from "@/features/habits/components/HabitsDisplay/HabitsDisplay"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

const SCREEN_WIDTH = Dimensions.get("window").width
const PAGE_WIDTH = SCREEN_WIDTH * 0.9

export default function Home() {
  const [currentTab, setCurrentTab] = useState<HabitStateTab>("todo")
  const { user, isPending, error } = useGetUser()

  if (isPending || error) return <IsLoading />

  return (
    <SafeAreaWrapper className="gap-3">
      <HomeStatsBar isDisabled={!user!.hasPartner} />
      <HabitsTabs
        options={HABIT_STATE_TABS}
        onPress={setCurrentTab}
        value={currentTab}
      />

      <View className="flex-1">
        {user!.hasPartner ? (
          <ScrollView
            horizontal
            snapToInterval={PAGE_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                width: PAGE_WIDTH,
                marginRight: 8, // spacing between the two
              }}
              className="bg-white rounded-t-main border-main p-2 border-b-0"
            >
              <HabitsDisplay owner="user" currentTab={currentTab} />
            </View>

            <View
              style={{
                width: PAGE_WIDTH,
              }}
              className="bg-white rounded-t-main border-main p-2 border-b-0"
            >
              <HabitsDisplay owner="partner" currentTab={currentTab} />
            </View>
          </ScrollView>
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
