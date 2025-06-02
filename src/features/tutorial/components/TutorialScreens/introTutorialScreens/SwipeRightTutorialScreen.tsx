import { Image, View } from "react-native"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"
import arrow from "@/assets/icons/arrow.png"
import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import TutorialHabitCard from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/components/tutorialHabitCard"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
  safeAreaTopInset: number
  goNext: () => void
}

export default function SwipeRightTutorialScreen({
  goNext,
  onClose,
  safeAreaTopInset,
  refScreenPositions,
}: Props) {
  const { x, y } = refScreenPositions.homeContainer

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y! + safeAreaTopInset + 53 }}>
        <TutorialHabitCard swiped="right" />
        <View
          style={{
            width: 35,
            height: 47,
            left: x! + 50,
            bottom: -15,
            zIndex: 100,
          }}
        >
          <Image source={arrow} />
        </View>
        <TutorialCard
          onClose={onClose}
          onPress={goNext}
          title="Swipe right to see
the habit’s strike"
          btnLabel="Got it!"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
