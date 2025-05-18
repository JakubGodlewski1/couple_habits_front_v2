import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import Text from "../../../components/Text"
import { ScrollView, View } from "react-native"
import SignOutBtn from "@/features/auth/components/SignOutBtn"
import RequestDayOffBtn from "@/features/takeDayOff/components/RequestDayOffBtn"
import DeleteAccountBtn from "@/features/user/components/DeleteAccountBtn"
import SendFeedbackBtn from "@/features/feedback/components/SendFeedbackBtn"
import ChangeAvatarBtn from "@/features/avatar/components/ChangeAvatarBtn"
import ShowTutorialBtn from "@/features/tutorial/components/showTutorialBtn"
import UpdatePartnerNameBtn from "@/features/user/components/updatePartnerNameBtn"
import DiscordBtn from "@/features/contactWithClient/components/DiscordBtn"
import UnmountOnBlur from "@/components/UnmountOnBlur"
import BuyProBtn from "@/features/subscriptions/components/BuyProBtn"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"

export default function Settings() {
  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!

  return (
    <SafeAreaWrapper className="max-h-full">
      <View className="flex-row justify-between items-center">
        <Text type="h1">Settings</Text>
        {hasProAccess && (
          <Text className="mb-8 bg-[#C6AE79] font-medium text-white px-4 py-1 rounded-lg mt-1">
            Pro account
          </Text>
        )}
      </View>
      <ScrollView contentContainerClassName="gap-3 flex-grow">
        <BuyProBtn />
        <RequestDayOffBtn />
        <ChangeAvatarBtn />
        <ShowTutorialBtn />
        <SendFeedbackBtn />
        <UpdatePartnerNameBtn />
        <DiscordBtn />
        <SignOutBtn />
        <UnmountOnBlur>
          <DeleteAccountBtn />
        </UnmountOnBlur>
      </ScrollView>
      <View className="h-[80px]" />
    </SafeAreaWrapper>
  )
}
