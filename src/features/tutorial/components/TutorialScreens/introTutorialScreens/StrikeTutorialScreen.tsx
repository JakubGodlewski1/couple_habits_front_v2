import { Image, View } from "react-native"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"
import arrow from "@/assets/icons/arrow.png"
import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
  safeAreaTopInset: number
  goNext: () => void
}

export default function StrikeTutorialScreen({
  refScreenPositions,
  onClose,
  safeAreaTopInset,
  goNext,
}: Props) {
  const { x, y } = refScreenPositions.strike

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y! + safeAreaTopInset + 25 }}>
        <View style={{ left: x! + 50, bottom: -15, zIndex: 100 }}>
          <Image source={arrow} />
        </View>
        <TutorialCard
          onClose={onClose}
          onPress={goNext}
          text="If either you or your partner doesn’t complete their habit, you will lose your shared strike"
          title="Shared strike"
          btnLabel="Next"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
