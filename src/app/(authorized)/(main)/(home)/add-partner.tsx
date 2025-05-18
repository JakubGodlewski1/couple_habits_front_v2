import SafeAreaWrapper from "../../../../components/SafeAreaWrapper"
import Text from "../../../../components/Text"
import { ScrollView, Share, View } from "react-native"
import Button from "../../../../components/Button"
import { Feather } from "@expo/vector-icons"
import DividerOr from "../../../../features/auth/components/DividerOr"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"
import AddPartnerForm from "@/features/addPartner/forms/AddPartnerForm"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export default function AddPartner() {
  const { setIsHidden } = useHideTabbarContext()
  const { user } = useGetUser()

  return (
    <SafeAreaWrapper className="mt-4">
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="never"
        contentContainerClassName="grow gap-6"
      >
        <Text className="text-center" type="h1">
          Let&apos;s
          <Text type="h1" className="text-secondary">
            {" "}
            Connect {"\n"}
          </Text>
          with {user!.partnerName} ❤️
        </Text>
        <View>
          <Text className="text-center mb-2">
            Give {user!.partnerName} your connection code
          </Text>
          <Button
            type="white"
            onPress={async () => {
              if (user?.connectionCode) {
                try {
                  await Share.share({
                    message: `Here is my connection code: ${user.connectionCode}`,
                  })
                } catch (error) {
                  console.error("Error sharing code:", error)
                }
              }
            }}
            title={user?.connectionCode}
            iconPosition="right"
          >
            <Feather name="share" size={18} color="black" />
          </Button>
        </View>
        <DividerOr />
        <AddPartnerForm />
        <Button
          classNames={{ wrapper: "mt-auto" }}
          type="subtle"
          onPress={() => {
            router.replace("/home")
            setIsHidden(false)
          }}
          title="Cancel"
        />
      </ScrollView>
    </SafeAreaWrapper>
  )
}
