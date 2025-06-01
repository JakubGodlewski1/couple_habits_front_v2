import TutorialCard from "@/features/tutorial/components/shared/TutorialCard"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"

type Props = {
  position: { x: number; y: number }
  onClose: () => void
}

export default function IntroTutorialScreen({ position, onClose }: Props) {
  const { setIsHidden } = useHideTabbarContext()

  return (
    <TutorialCard
      onClose={onClose}
      onPress={() => {
        setIsHidden(true)
        router.push("/add-habit")
        onClose()
      }}
      title={`Its time to create Your first habit`}
      btnLabel="Let's do it"
      positon={position}
    />
  )
}
