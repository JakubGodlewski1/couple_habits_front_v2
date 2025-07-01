import { useTutorial } from "@/features/tutorial/hooks/useTutorial"
import ConnectionTutorialScreen from "@/features/tutorial/components/TutorialScreens/ConnectionTutorialScreen"
import FirstHabitTutorialScreen from "@/features/tutorial/components/TutorialScreens/FirstHabitTutorialScreen"
import IntroTutorialScreen from "@/features/tutorial/components/TutorialScreens/introTutorialScreens"
import PartnerAvatarTutorialScreen from "@/features/tutorial/components/TutorialScreens/PartnerAvatarTutorialScreen"
import InviteToDiscordTutorialScreen from "@/features/tutorial/components/TutorialScreens/InviteToDiscordTutorialScreen"

const tutorialComponents: Record<TutorialType, any> = {
  connection: ConnectionTutorialScreen,
  firstHabit: FirstHabitTutorialScreen,
  intro: IntroTutorialScreen,
  partnerAvatar: PartnerAvatarTutorialScreen,
  discordInvite: InviteToDiscordTutorialScreen,
} as const

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
