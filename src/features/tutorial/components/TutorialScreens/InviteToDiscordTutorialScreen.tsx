import { View, TouchableOpacity } from "react-native"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import { vibrate } from "@/utils/vibrate"
import { AntDesign } from "@expo/vector-icons"
import Text from "@/components/Text"
import DiscordBtn from "@/features/contactWithClient/components/DiscordBtn"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
}

export default function InviteToDiscordTutorialScreen({ onClose }: Props) {
  return (
    <TutorialBackgroundWrapper>
      <View className="my-auto pb-16">
        <View className="bg-black/60 p-5 rounded-xl w-[90vw] left-1/2 -translate-x-1/2 gap-6">
          <TouchableOpacity
            className="ml-auto absolute right-0 top-0 p-3  z-[100]"
            onPress={() => {
              vibrate()
              onClose()
            }}
          >
            <AntDesign name="close" size={20} color="white" />
          </TouchableOpacity>
          <Text
            style={{ marginBottom: 0 }}
            className="text-white text-center"
            type="h1"
          >
            Want to improve the app?
          </Text>
          <Text className="text-white text-center font-semibold">
            Join Discord — your feedback goes straight to the team. You’ll truly
            make a difference.{" "}
            <Text className="underline">We really need You!</Text>
          </Text>
          <DiscordBtn title="Join discord" />
        </View>
      </View>
    </TutorialBackgroundWrapper>
  )
}
