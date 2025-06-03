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

export default function SwipeLeftTutorialScreen({
  goNext,
  onClose,
  refScreenPositions,
}: Props) {
  const { x, y } = refScreenPositions.homeContainer

  return (
    <View style={{ top: y! + 53 }}>
      <TutorialHabitCard swiped="left" />
      <>
        <Image
          className="self-end -bottom-4 z-[100] rotate-[60deg]"
          style={{ right: x! + 40 }}
          source={arrow}
        />
      </>
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        title="Swipe left to either delete or update "
        btnLabel="Next"
      />
    </View>
  )
}
