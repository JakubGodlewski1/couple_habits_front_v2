import { ReactNode, useEffect, useRef } from "react"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import StrikeContainer from "@/components/StrikeContainer"
import MenuContainerTutorial from "@/features/tutorial/components/MenuContainerTutorial"

type Props = {
  children: ReactNode
  animateSwipe?: "left" | "right"
}

export default function SwapeableHabitCardTutorialWrapper({
  children,
  animateSwipe,
}: Props) {
  const cardRef = useRef<SwipeableMethods>(null)

  //animate the card
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    let timeoutId: NodeJS.Timeout | undefined
    let secondTimeoutId: NodeJS.Timeout | undefined

    if (animateSwipe && cardRef.current) {
      const animate = () => {
        cardRef.current![animateSwipe === "left" ? "openLeft" : "openRight"]()

        timeoutId = setTimeout(() => {
          cardRef.current!.close()
        }, 1000)
      }

      secondTimeoutId = setTimeout(() => {
        animate()
      }, 500)

      intervalId = setInterval(() => {
        animate()
      }, 2500)
    }

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      clearTimeout(secondTimeoutId)
    }
  }, [animateSwipe, cardRef.current])

  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <Swipeable
        ref={cardRef}
        containerStyle={{ borderRadius: 8, backgroundColor: "white" }}
        renderLeftActions={() => <StrikeContainer strike={5} />}
        renderRightActions={() => <MenuContainerTutorial />}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  )
}
