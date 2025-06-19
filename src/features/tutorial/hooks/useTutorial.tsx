import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"
import { useTutorialContext } from "@/features/tutorial/contexts/tutorialContext"
import { useEffect, useState } from "react"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { usePathname } from "expo-router"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"

export const useTutorial = () => {
  const [visibleTutorial, setVisibleTutorial] = useState<TutorialType | null>(
    null,
  )

  const pathname = usePathname()

  const {
    isLoading,
    refScreenPositions,
    seenTutorials,
    user,
    habits,
    setTutorialSeen,
    partnerAvatar,
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
    seenTutorials.partnerAvatar,
    pathname,
    refScreenPositions.partnerAvatar.x,
    refScreenPositions.partnerAvatar.y,
    partnerAvatar,
  ])

  /*main logic*/
  const rules = () => {
    //"connect with partner" screen
    if (!seenTutorials.connection && !user?.hasPartner) {
      setVisibleTutorial("connection")
    }
    //"add first habit" screen
    else if (
      !seenTutorials.firstHabit &&
      habits.length === 0 &&
      user?.hasPartner
    ) {
      setVisibleTutorial("firstHabit")
    }
    //"intro" screen
    else if (!seenTutorials.intro && habits.length === 1) {
      setVisibleTutorial("intro")
    }
    //"partner avatar" tutorial screen
    else if (
      !seenTutorials.partnerAvatar &&
      !partnerAvatar &&
      refScreenPositions.partnerAvatar.x &&
      refScreenPositions.partnerAvatar.y &&
      pathname.includes("/partner-home")
    ) {
      setVisibleTutorial("partnerAvatar")
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
  const { data: habits, isLoading: habitsAreLoading } = useGetHabits()
  const user = useGetUser().user!
  const avatars = useGetAvatars().avatars!

  const {
    isLoading: isLoadingTutorialContext,
    seenTutorials,
    setTutorialSeen,
  } = useTutorialContext()

  const { homeContainer, points, strike, ideasTabbar, partnerTabbar } =
    refScreenPositions

  const isLoading =
    habitsAreLoading ||
    isLoadingTutorialContext ||
    !homeContainer.x ||
    !homeContainer.y ||
    !points.x ||
    !points.y ||
    !strike.x ||
    !strike.y ||
    !ideasTabbar.x ||
    !ideasTabbar.y ||
    !partnerTabbar.x ||
    !partnerTabbar.y

  return {
    setTutorialSeen,
    partnerAvatar: avatars?.partnerAvatarBase64,
    isLoading,
    refScreenPositions,
    seenTutorials,
    user,
    habits: habits?.user || [],
  }
}
