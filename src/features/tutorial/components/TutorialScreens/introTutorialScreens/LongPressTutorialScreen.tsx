import { Image, View } from "react-native"
import longPress from "@/assets/icons/long_press.png"
import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import TutorialHabitCard from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/components/tutorialHabitCard"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
  safeAreaTopInset: number
  goNext: () => void
}

export default function LongPressTutorialScreen({
  goNext,
  onClose,
  refScreenPositions,
}: Props) {
  const { y } = refScreenPositions.homeContainer

  return (
    <View style={{ top: y! + 53 }}>
      <View className="relative mb-10">
        <TutorialHabitCard />
        <Image
          className="w-[90px] h-[90px] self-end absolute left-1/2 -bottom-8 -rotate-[45deg]"
          source={longPress}
        />
      </View>
      <TutorialCard
        onClose={onClose}
        onPress={goNext}
        text="It’ll use some shared points and needs your partner’s approval"
        title="Long press to skip"
        btnLabel="Next"
      />
    </View>
  )
}
