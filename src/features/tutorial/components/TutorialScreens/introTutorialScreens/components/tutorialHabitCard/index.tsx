import { View } from "react-native"
import Checkbox from "@/components/Checkbox"
import Text from "@/components/Text"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import { useEffect, useRef } from "react"
import StrikeContainer from "@/components/StrikeContainer"
import TutorialMenuContainer from "@/features/tutorial/components/TutorialScreens/introTutorialScreens/components/tutorialHabitCard/TutorialMenuContainer"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function TutorialHabitCard({
  swiped,
}: {
  swiped: "left" | "right"
}) {
  const swipeableRef = useRef<SwipeableMethods>(null)

  useEffect(() => {
    if (swipeableRef.current) {
      const timeout = setTimeout(() => {
        if (swiped === "left") {
          swipeableRef.current!.openRight()
        } else {
          swipeableRef.current!.openLeft()
        }
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [swiped])

  return (
    <View className="border-[1px] rounded-xl p-1 border-subtle">
      <GestureHandlerRootView style={{ flexGrow: 1 }}>
        <Swipeable
          ref={swipeableRef}
          containerStyle={{ borderRadius: 8, backgroundColor: "white" }}
          renderLeftActions={() => <StrikeContainer strike={3} />}
          renderRightActions={() => <TutorialMenuContainer />}
        >
          <View className="bg-white p-2 h-[92px] shadow-lg rounded-xl">
            <Text type="sm" className="ml-2">
              Go to the gym
            </Text>
            <Checkbox
              onPress={() => {}}
              className="mr-auto mt-auto"
              isChecked={false}
            />
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    </View>
  )
}
