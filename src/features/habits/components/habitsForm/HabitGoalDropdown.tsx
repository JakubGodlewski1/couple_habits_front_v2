import Dropdown from "../../../../components/Dropdown"
import { GoalType } from "@/features/habits/types/habitForm"

const options: { key: GoalType; label: string }[] = [
  { key: "atLeast", label: "At least" },
  { key: "atMost", label: "At most" },
]

type Props = {
  value: GoalType
  onChange: (value: GoalType) => void
  isDisabled?: boolean
}

export default function HabitGoalDropdown({
  onChange,
  value,
  isDisabled,
}: Props) {
  return (
    <Dropdown
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}
