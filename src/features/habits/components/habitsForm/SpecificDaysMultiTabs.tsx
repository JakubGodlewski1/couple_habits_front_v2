import MultiSelect from "../../../../components/MultiSelect"
import { DAYS_OF_THE_WEEK } from "@/consts/consts"

const options = DAYS_OF_THE_WEEK.map((day) => ({
  key: day,
  label: day.slice(0, 1).toUpperCase() + day.slice(1, 2),
}))

type Props<T> = {
  value: T[]
  onChange: (value: T) => void
}

export default function SpecificDaysMultiTabs({
  value,
  onChange,
}: Props<(typeof DAYS_OF_THE_WEEK)[number]>) {
  return <MultiSelect value={value} options={options} onChange={onChange} />
}
