import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import Text from "../../../components/Text"
import { ScrollView, View } from "react-native"
import SignOutBtn from "@/features/auth/components/SignOutBtn"
import DeleteAccountBtn from "@/features/user/components/DeleteAccountBtn"
import SendFeedbackBtn from "@/features/feedback/components/SendFeedbackBtn"
import ChangePartnerAvatarBtn from "@/features/avatar/components/ChangePartnerAvatarBtn"
import UpdatePartnerNameBtn from "@/features/user/components/updatePartnerNameBtn"
import DiscordBtn from "@/features/contactWithClient/components/DiscordBtn"
import UnmountOnBlur from "@/components/UnmountOnBlur"
import BuyProBtn from "@/features/subscriptions/components/BuyProBtn"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"

export default function Settings() {
  const { subscriptionInfo } = useGetSubscriptionInfo()

  return (
    <SafeAreaWrapper className="max-h-full">
      <View className="flex-row justify-between items-center">
        <Text type="h1">Settings</Text>

        {subscriptionInfo?.hasProAccess && (
          <Text className="mb-8 bg-[#C6AE79] font-medium text-white px-4 py-1 rounded-lg mt-1">
            Pro account
          </Text>
        )}
      </View>
      <ScrollView contentContainerClassName="gap-2 flex-grow">
        <BuyProBtn />
        <ChangePartnerAvatarBtn />
        <UpdatePartnerNameBtn />
        <SendFeedbackBtn />
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
