import { Image, View } from "react-native"
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
  refScreenPositions,
}: Props) {
  const { x, y } = refScreenPositions.homeContainer

  return (
    <View style={{ top: y! + 53 }}>
      <TutorialHabitCard swiped="right" />
      <Image
        className="-bottom-4 z-[100]"
        style={{ left: x! + 40 }}
        source={arrow}
      />
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        title="Swipe right to see
the habit’s strike"
        btnLabel="Next"
      />
    </View>
  )
}
