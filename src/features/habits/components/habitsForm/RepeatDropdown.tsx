import Dropdown from "../../../../components/Dropdown"
import { RepeatValue } from "@/features/habits/types/habitForm"

const options: { key: RepeatValue; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
]

type Props = {
  value: RepeatValue
  onChange: (value: RepeatValue) => void
  isDisabled?: boolean
}

export default function RepeatDropdown({ onChange, value, isDisabled }: Props) {
  return (
    <Dropdown
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}
