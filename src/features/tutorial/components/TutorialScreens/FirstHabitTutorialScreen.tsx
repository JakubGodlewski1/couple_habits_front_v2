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

export default function FirstHabitTutorialScreen({
  refScreenPositions,
  onClose,
}: Props) {
  const { setIsHidden } = useHideTabbarContext()

  const { y } = refScreenPositions.homeContainer

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y }}>
        <TutorialCard
          showCloseButton
          onClose={onClose}
          onPress={() => {
            setIsHidden(true)
            router.push("/add-habit")
            onClose()
          }}
          title={`It's time to create Your first habit`}
          btnLabel="Let's do it!"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
