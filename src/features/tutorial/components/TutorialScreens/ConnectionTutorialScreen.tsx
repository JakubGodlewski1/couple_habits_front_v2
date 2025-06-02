import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"
import { View } from "react-native"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
}

export default function ConnectionTutorialScreen({
  refScreenPositions,
  onClose,
}: Props) {
  const { setIsHidden } = useHideTabbarContext()

  const { y } = refScreenPositions.homeContainer

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y }}>
        <TutorialCard
          onClose={onClose}
          onPress={() => {
            setIsHidden(true)
            router.push("/add-partner")
            onClose()
          }}
          title={`Connect with \n {partner}`}
          text="Before creating your first habit, you need to connect with your partner"
          btnLabel="Connect"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
