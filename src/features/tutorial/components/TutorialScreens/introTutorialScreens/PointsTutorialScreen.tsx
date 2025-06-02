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

export default function PointsTutorialScreen({
  refScreenPositions,
  onClose,
  safeAreaTopInset,
  goNext,
}: Props) {
  const { x, y } = refScreenPositions.points

  return (
    <TutorialBackgroundWrapper>
      <View style={{ top: y! + safeAreaTopInset + 25 }}>
        <View
          style={{
            width: 35,
            height: 47,
            left: x! + 50,
            bottom: -15,
            zIndex: 100,
            transform: [{ scaleX: -1 }],
          }}
        >
          <Image source={arrow} />
        </View>
        <TutorialCard
          onClose={onClose}
          onPress={goNext}
          text="You can use points to skip habits – but it’ll need your partner’s approval 🙂"
          title="Shared points"
          btnLabel="Next"
        />
      </View>
    </TutorialBackgroundWrapper>
  )
}
