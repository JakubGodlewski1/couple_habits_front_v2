import Checkbox from "@/components/Checkbox"
import { GoalType } from "@/features/habits/types/habitForm"
import { useState } from "react"

type Props = {
  onPress: (toggle: boolean) => void
  completedCount: number
  goalType: GoalType
  tagetCount: number
}

export default function CheckboxWithNumber({
  onPress,
  completedCount,
  tagetCount,
  goalType,
}: Props) {
  const [onCompleteValue, setOnCompleteValue] = useState<number | null>(null)

  const isCompleted =
    goalType === "atLeast"
      ? completedCount >= tagetCount
      : completedCount <= tagetCount

  const innerValue =
    completedCount > 0 && completedCount < tagetCount
      ? completedCount
      : undefined

  const onPressWrapper = () => {
    setOnCompleteValue(completedCount + 1)
    setTimeout(() => {
      setOnCompleteValue(null)
      onPress(true)
    }, 800)
  }

  return (
    <Checkbox
      innerValue={onCompleteValue || innerValue}
      onPress={onPressWrapper}
      isChecked={isCompleted}
    />
  )
}
