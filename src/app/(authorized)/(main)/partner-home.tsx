import { useState } from "react"
import { Image, View } from "react-native"
import { HabitStateTab } from "@/features/habits/types/habitStateTabs"
import { HABIT_STATE_TABS } from "@/consts/consts"
import HabitsDisplay from "@/features/habits/components/HabitsDisplay/HabitsDisplay"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import HabitsTabs from "@/features/habits/components/habitsForm/HabitsTabs"
import Text from "@/components/Text"
import GoToAddPartnerPageBtn from "@/features/addPartner/components/GoToAddPartnerPageBtn"
import coupleHighFive from "@/assets/illustrations/couple-high-five.png"
import PartnerAvatarBox from "@/components/PartnerAvatarBox"

export default function PartnerHome() {
  const [currentTab, setCurrentTab] = useState<HabitStateTab>("todo")
  const user = useGetUser().user

  return (
    <SafeAreaWrapper className="gap-2">
      <PartnerAvatarBox />
      <HabitsTabs
        options={HABIT_STATE_TABS}
        onPress={setCurrentTab}
        value={currentTab}
      />

      <View className="flex-1">
        {user!.hasPartner ? (
          <View className="bg-white rounded-t-main border-main p-2 border-b-0 flex-1">
            <HabitsDisplay owner="partner" currentTab={currentTab} />
          </View>
        ) : (
          <View className="bg-white rounded-t-main border-main flex-1 p-2 border-b-0">
            <NotConnectedDisplay user={user!} />
          </View>
        )}
      </View>
    </SafeAreaWrapper>
  )
}

const NotConnectedDisplay = ({ user }: { user: UserFromBackend }) => {
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
          Connect with {user!.partnerName} {"\n"} first
        </Text>
      </View>
      <GoToAddPartnerPageBtn />
      <View className="h-24" />
    </View>
  )
}
