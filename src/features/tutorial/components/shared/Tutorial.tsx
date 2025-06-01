import { useTutorial } from "@/features/tutorial/hooks/useTutorial"
import ConnectionTutorialScreen from "@/features/tutorial/components/TutorialScreens/ConnectionTutorialScreen"
import FirstHabitTutorialScreen from "@/features/tutorial/components/TutorialScreens/FirstHabitTutorialScreen"

export default function Tutorial() {
  const { isLoading, visibleTutorial, setTutorialSeen, refScreenPositions } =
    useTutorial()

  if (isLoading || !visibleTutorial) return null

  if (visibleTutorial === "connection") {
    return (
      <ConnectionTutorialScreen
        refScreenPositions={refScreenPositions}
        onClose={() => setTutorialSeen("connection", true)}
      />
    )
  } else if (visibleTutorial === "firstHabit") {
    return (
      <FirstHabitTutorialScreen
        refScreenPositions={refScreenPositions}
        onClose={() => setTutorialSeen("firstHabit", true)}
      />
    )
  }
}
