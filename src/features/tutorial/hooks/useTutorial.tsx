import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"
import { useTutorialContext } from "@/features/tutorial/contexts/tutorialContext"
import { useEffect, useState } from "react"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"

export const useTutorial = () => {
  const [visibleTutorial, setVisibleTutorial] = useState<TutorialType | null>(
    null,
  )
  const {
    isLoading,
    refScreenPositions,
    seenTutorials,
    user,
    habits,
    setTutorialSeen,
  } = useLoadData()

  useEffect(() => {
    if (!isLoading) {
      rules()
    }
  }, [
    isLoading,
    user?.hasPartner,
    habits.length,
    seenTutorials.firstHabit,
    seenTutorials.connection,
    seenTutorials.intro,
    seenTutorials.avatar,
  ])

  /*main logic*/
  const rules = () => {
    //show "connect with partner" tutorial screen
    if (!seenTutorials.connection && !user?.hasPartner) {
      setVisibleTutorial("connection")
    }
    //show "add first habit" tutorial screen
    else if (
      !seenTutorials.firstHabit &&
      habits.length === 0 &&
      user?.hasPartner
    ) {
      setVisibleTutorial("firstHabit")
    }
    //show "intro" tutorial screen
    else if (!seenTutorials.intro && habits.length === 1) {
      setVisibleTutorial("intro")
    } else setVisibleTutorial(null)
  }

  return {
    isLoading,
    visibleTutorial,
    setTutorialSeen,
    refScreenPositions,
  }
}

//helpers
const useLoadData = () => {
  const { refScreenPositions } = useTutorialRefContext()
  const { isLoading: isLoadingHabits, data: habits } = useGetHabits()
  const { isPending: isLoadingUser, user } = useGetUser()
  const {
    isLoading: isLoadingTutorialContext,
    seenTutorials,
    setTutorialSeen,
  } = useTutorialContext()

  const { homeContainer, points, strike } = refScreenPositions
  const isLoading =
    isLoadingHabits ||
    isLoadingUser ||
    isLoadingTutorialContext ||
    !homeContainer.x ||
    !homeContainer.y ||
    !points.x ||
    !points.y ||
    !strike.x ||
    !strike.y

  return {
    setTutorialSeen,
    isLoading,
    refScreenPositions,
    seenTutorials,
    user,
    habits: habits?.user || [],
  }
}
