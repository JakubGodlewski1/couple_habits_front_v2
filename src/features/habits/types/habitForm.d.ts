import { DayOfTheWeek } from "@/types/daysOfWeek"

type RepeatValue = "daily" | "weekly" | "monthly"
type FrequencyType = "repeat" | "specificDays"
type SpecificDaysValue = DayOfTheWeek[]

export type GoalType = "atLeast" | "atMost"

type HabitFormType = {
  label: string
  isShared?: boolean
  frequency: Frequency
  goalType: GoalType
  targetCount: number
}

type Frequency =
  | { type: "repeat"; value: RepeatValue }
  | { type: "specificDays"; value: SpecificDaysValue }
