import { useTutorial } from "@/features/tutorial/hooks/useTutorial"
import ConnectionTutorialScreen from "@/features/tutorial/components/TutorialScreens/ConnectionTutorialScreen"
import FirstHabitTutorialScreen from "@/features/tutorial/components/TutorialScreens/FirstHabitTutorialScreen"
import IntroTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens"

const tutorialComponents = {
  connection: ConnectionTutorialScreen,
  firstHabit: FirstHabitTutorialScreen,
  intro: IntroTutorialScreen,
} as const

type TutorialType = keyof typeof tutorialComponents

export default function TutorialRouter() {
  const { isLoading, visibleTutorial, setTutorialSeen, refScreenPositions } =
    useTutorial()

  if (isLoading || !visibleTutorial) return null

  const TutorialComponent = tutorialComponents[visibleTutorial as TutorialType]

  return (
    <TutorialComponent
      refScreenPositions={refScreenPositions}
      onClose={() => setTutorialSeen(visibleTutorial, true)}
    />
  )
}
