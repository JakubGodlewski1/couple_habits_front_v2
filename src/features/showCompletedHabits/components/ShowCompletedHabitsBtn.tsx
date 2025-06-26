import { useShowCompletedHabitsContext } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"
import Checkbox from "@/components/Checkbox"
import Button from "@/components/Button"
import { View } from "react-native"

export default function ShowCompletedHabitsBtn() {
  const { setShowCompletedHabits, showCompletedHabits } =
    useShowCompletedHabitsContext()

  return (
    <Button
      type="white"
      classNames={{ wrapper: "justify-between" }}
      iconPosition="right"
      onPress={() => setShowCompletedHabits(!showCompletedHabits)}
      title="Hide completed habits"
    >
      <View>
        <Checkbox
          color="green"
          onPress={() => setShowCompletedHabits(!showCompletedHabits)}
          isChecked={!showCompletedHabits}
        />
      </View>
    </Button>
  )
}
