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
      <View style={{ marginTop: y! + safeAreaTopInset + 20 }}>
        <Image
          className="z-[100px] -bottom-4"
          style={{ left: x! + 50 }}
          source={arrow}
        />
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
