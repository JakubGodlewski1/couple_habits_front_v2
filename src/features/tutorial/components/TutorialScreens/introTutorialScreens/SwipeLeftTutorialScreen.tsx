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

export default function SwipeLeftTutorialScreen({
  goNext,
  onClose,
  safeAreaTopInset,
  refScreenPositions,
}: Props) {
  const { x, y } = refScreenPositions.homeContainer

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y! + safeAreaTopInset + 53 }}>
        <TutorialHabitCard swiped="left" />
        <View
          className="self-end "
          style={{
            marginRight: x! + 35,
            bottom: -15,
            width: 35,
            height: 47,
            zIndex: 100,
            transform: [{ scaleX: -1 }],
          }}
        >
          <Image source={arrow} />
        </View>
        <TutorialCard
          onClose={onClose}
          onPress={goNext}
          title="Swipe left to either delete or update "
          btnLabel="Next"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
