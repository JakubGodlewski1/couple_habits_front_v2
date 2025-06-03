import { RefScreenPositions } from "@/features/tutorial/contexts/tutorialRefContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ComponentType, useState } from "react"
import StrikeTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/StrikeTutorialScreen"
import PointsTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/PointsTutorialScreen"
import SwipeRightTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/SwipeRightTutorialScreen"
import SwipeLeftTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/SwipeLeftTutorialScreen"
import { useTutorialContext } from "@/features/tutorial/contexts/tutorialContext"
import LongPressTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/LongPressTutorialScreen"
import PartnerPageTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/PartnerPageTutorialScreen"
import IdeasPageTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/IdeasPageTutorialScreen"
import TutorialBackgroundWrapper from "@/features/tutorial/components/shared/TutorialBackgroundWrapper"

type Props = {
  refScreenPositions: RefScreenPositions
  onClose: () => void
}

const screens: Record<
  IntroScreenType,
  ComponentType<{
    goNext: () => void
    refScreenPositions: RefScreenPositions
    onClose: () => void
    safeAreaTopInset: number
  }>
> = {
  strike: StrikeTutorialScreen,
  points: PointsTutorialScreen,
  swipeLeft: SwipeLeftTutorialScreen,
  swipeRight: SwipeRightTutorialScreen,
  longPress: LongPressTutorialScreen,
  partnerPage: PartnerPageTutorialScreen,
  ideasPage: IdeasPageTutorialScreen,
  // Add more mappings here
}

const screenOrder: IntroScreenType[] = [
  "strike",
  "points",
  "swipeLeft",
  "swipeRight",
  "longPress",
  "partnerPage",
  "ideasPage",
]

export default function IntroTutorialScreen({
  refScreenPositions,
  onClose,
}: Props) {
  const { top } = useSafeAreaInsets()
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  const { setTutorialSeen } = useTutorialContext()

  const currentScreenKey = screenOrder[currentScreenIndex]
  const ScreenComponent = screens[currentScreenKey]

  const goNext = async () => {
    const nextIndex = currentScreenIndex + 1
    if (nextIndex < screenOrder.length) {
      setCurrentScreenIndex(nextIndex)
    } else {
      await setTutorialSeen("intro", true)
    }
  }

  return (
    <TutorialBackgroundWrapper>
      <ScreenComponent
        goNext={goNext}
        refScreenPositions={refScreenPositions}
        onClose={onClose}
        safeAreaTopInset={top}
      />
    </TutorialBackgroundWrapper>
  )
}
