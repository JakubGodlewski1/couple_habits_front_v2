import { GestureHandlerRootView } from "react-native-gesture-handler"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import StrikeContainer from "@/components/StrikeContainer"
import MenuContainer from "@/features/habits/components/habitCard/components/MenuContainer"
import { ReactNode, useRef } from "react"
import { HabitFromBackend } from "@/features/habits/types/habitCard"

type Props = {
  children: ReactNode
  habit: HabitFromBackend
}

export default function SwapeableHabitCardWrapper({ children, habit }: Props) {
  const swipeableRef = useRef<SwipeableMethods>(null)
  const closeHabitCard = () =>
    swipeableRef.current && swipeableRef.current.close()

  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <Swipeable
        ref={swipeableRef}
        containerStyle={{ borderRadius: 8, backgroundColor: "white" }}
        renderLeftActions={() => <StrikeContainer strike={habit.strike} />}
        renderRightActions={() => (
          <MenuContainer closeHabitCard={closeHabitCard} habit={habit} />
        )}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  )
}
