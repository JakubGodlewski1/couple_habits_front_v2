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

export default function IdeasPageTutorialScreen({
  goNext,
  onClose,
  refScreenPositions,
  safeAreaTopInset,
}: Props) {
  const { y } = refScreenPositions.partnerTabbar

  return (
    <View
      className="-translate-y-[100%]"
      style={{ top: y! - safeAreaTopInset }}
    >
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        text="Running low on ideas? No worries — there’s plenty for you to explore!"
        title="Hundreds of ideas"
        btnLabel="Got it!"
      />
      <Image className="rotate-[200deg] left-36 bottom-2 " source={arrow} />
    </View>
  )
}
