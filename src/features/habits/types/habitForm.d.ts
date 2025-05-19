import { DayOfTheWeek } from "@/types/daysOfWeek"

type RepeatValue = "daily" | "weekly"
type FrequencyType = "repeat" | "specificDays"
type SpecificDaysValue = DayOfTheWeek[]

type HabitFormType = {
  label: string
  frequency: Frequency
}

type Frequency =
  | { type: "repeat"; value: RepeatValue }
  | { type: "specificDays"; value: SpecificDaysValue }
