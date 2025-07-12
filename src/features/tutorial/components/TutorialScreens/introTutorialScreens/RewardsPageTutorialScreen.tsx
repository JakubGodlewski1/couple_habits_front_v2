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

export default function RewardsPageTutorialScreen({
  goNext,
  onClose,
  refScreenPositions,
  safeAreaTopInset,
}: Props) {
  const { y, x } = refScreenPositions.rewardsTabbar

  return (
    <View
      className="-translate-y-[100%]"
      style={{ top: y! - safeAreaTopInset }}
    >
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        text="Earn points and spend them on rewards you create!"
        title="Your Reward Store"
        btnLabel="Got it!"
      />
      <Image
        style={{ left: x! + 20 }}
        className="rotate-[-120deg]  bottom-2 "
        source={arrow}
      />
    </View>
  )
}
