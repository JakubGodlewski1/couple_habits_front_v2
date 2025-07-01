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
  swiped?: "left" | "right"
}) {
  const swipeableRef = useRef<SwipeableMethods>(null)

  useEffect(() => {
    if (swipeableRef.current && swiped) {
      const timeout = setTimeout(
        () => {
          if (swiped === "left") {
            swipeableRef.current!.openRight()
          } else {
            swipeableRef.current!.openLeft()
          }
        },
        swiped == "left" ? 1100 : 600,
      )

      return () => clearTimeout(timeout)
    }
  }, [swiped])

  return (
    <View className="mx-2">
      <GestureHandlerRootView style={{ flexGrow: 1 }}>
        <Swipeable
          ref={swipeableRef}
          containerStyle={{
            backgroundColor: "white",
            borderRadius: 8,
            overflow: "hidden",
          }}
          renderLeftActions={() => <StrikeContainer strike={3} />}
          renderRightActions={() => <TutorialMenuContainer />}
        >
          <View className="flex-row justify-between items-center py-4 bg-white border-y border-gray-100 pl-4 shadow-xl">
            <Checkbox onPress={() => {}} disabled isChecked={false} />
            <View className="flex-1 ml-2 mr-2">
              <Text type="sm" className="flex-shrink text-left">
                Wake up before 6am
              </Text>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    </View>
  )
}
