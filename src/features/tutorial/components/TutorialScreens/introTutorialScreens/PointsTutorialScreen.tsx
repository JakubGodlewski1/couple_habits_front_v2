import { Image, View } from "react-native"
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
    <View style={{ top: y! + safeAreaTopInset + 20 }}>
      <Image
        style={{ left: x! + 50 }}
        className="z-[100] -bottom-4 rotate-[60deg]"
        source={arrow}
      />
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        text="You can use points to skip habits – but it’ll need your partner’s approval 🙂"
        title="Shared points"
        btnLabel="Next"
      />
    </View>
  )
}
