import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import Text from "../../../components/Text"
import { Image, ScrollView, View } from "react-native"
import SignOutBtn from "@/features/auth/components/SignOutBtn"
import DeleteAccountBtn from "@/features/user/components/DeleteAccountBtn"
import SendFeedbackBtn from "@/features/feedback/components/SendFeedbackBtn"
import ChangeAvatarBtn from "@/features/avatar/components/ChangeAvatarBtn"
import UpdatePartnerNameBtn from "@/features/user/components/updatePartnerNameBtn"
import DiscordBtn from "@/features/contactWithClient/components/DiscordBtn"
import UnmountOnBlur from "@/components/UnmountOnBlur"
import BuyProBtn from "@/features/subscriptions/components/BuyProBtn"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"

export default function Settings() {
  const { subscriptionInfo, isPending, error } = useGetSubscriptionInfo()
  const { avatars } = useGetAvatars()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  return (
    <SafeAreaWrapper className="max-h-full">
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-between items-start w-full">
          <Text type="h1">Settings</Text>
          {avatars?.userAvatarBase64 && (
            <Image
              className="w-12 h-12 rounded-full border-2 border-main"
              source={{
                uri: `${avatars!.userAvatarBase64}`,
              }}
            />
          )}
        </View>
        {subscriptionInfo!.hasProAccess && (
          <Text className="mb-8 bg-[#C6AE79] font-medium text-white px-4 py-1 rounded-lg mt-1">
            Pro account
          </Text>
        )}
      </View>
      <ScrollView contentContainerClassName="gap-2 flex-grow">
        <BuyProBtn />
        <ChangeAvatarBtn />
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
