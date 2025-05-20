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
  isDisabled?: boolean
}

export default function SwapeableHabitCardWrapper({
  children,
  habit,
  isDisabled = false,
}: Props) {
  const swipeableRef = useRef<SwipeableMethods>(null)
  const closeHabitCard = () =>
    swipeableRef.current && swipeableRef.current.close()

  const renderLeftActions = () => <StrikeContainer strike={habit.strike} />
  const renderRightActions = () =>
    isDisabled ? null : (
      <MenuContainer closeHabitCard={closeHabitCard} habit={habit} />
    )

  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <Swipeable
        ref={swipeableRef}
        containerStyle={{ borderRadius: 8, backgroundColor: "white" }}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  )
}
