import Tabs from "../../../../components/Tabs"
import { HabitStateTab } from "../../types/habitStateTabs"

type Option = {
  key: HabitStateTab
  label: string
}

type Props = {
  options: readonly Option[]
  onPress: (key: HabitStateTab) => void
  value: HabitStateTab
}

export default function HabitsTabs({ options, value, onPress }: Props) {
  return <Tabs options={options} onPress={onPress} value={value} />
}
