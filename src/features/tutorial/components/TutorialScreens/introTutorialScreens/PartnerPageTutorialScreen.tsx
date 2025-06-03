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

export default function PartnerPageTutorialScreen({
  goNext,
  onClose,
  refScreenPositions,
}: Props) {
  const { y } = refScreenPositions.partnerTabbar

  return (
    <View className="-translate-y-[100%]" style={{ top: y! }}>
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        text="Check out how {partner} is doing with their habits and daily progress!"
        title="{partner}'s habits"
        btnLabel="Next"
      />
      <Image
        className="self-end rotate-[180deg] right-20 bottom-3"
        source={arrow}
      />
    </View>
  )
}
