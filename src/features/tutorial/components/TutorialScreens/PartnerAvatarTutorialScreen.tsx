import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"
import { Image, View } from "react-native"
import arrow from "@/assets/icons/arrow.png"
import { useUploadPartnerAvatar } from "@/features/avatar/api/hooks/useUploadPartnerAvatar"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
}

export default function PartnerAvatarTutorialScreen({
  refScreenPositions,
  onClose,
}: Props) {
  const { y } = refScreenPositions.partnerAvatar
  const { top } = useSafeAreaInsets()

  const { uploadPartnerAvatar } = useUploadPartnerAvatar()

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y! + 160 - top }}>
        <Image
          className="z-[100] -bottom-4 rotate-[33deg] left-1/2 -translate-x-2/3"
          source={arrow}
        />
        <TutorialCard
          showCloseButton
          onClose={onClose}
          onPress={() => {
            onClose()
            uploadPartnerAvatar()
          }}
          text="Make it truly yours—pick that one photo of your loved one that always makes you smile 😊"
          title="Update {partner}'s avatar"
          btnLabel="Update"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
