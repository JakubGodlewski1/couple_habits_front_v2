import Dropdown from "../../../../components/Dropdown"
import { RepeatValue } from "@/features/habits/types/habitForm"

const options: { key: RepeatValue; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
]

type Props = {
  value: RepeatValue
  onChange: (value: RepeatValue) => void
}

export default function RepeatDropdown({ onChange, value }: Props) {
  return <Dropdown value={value} onChange={onChange} options={options} />
}
