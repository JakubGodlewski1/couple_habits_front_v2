import { DayOfTheWeek } from "@/types/daysOfWeek"

export type HabitCard = {
  id: number
  strike: number
  frequency:
    | {
        type: "repeat"
        value: "daily" | "weekly"
      }
    | {
        type: "specificDays"
        value: DayOfTheWeek[]
      }
  label: string
  isCompleted: boolean
}

export type HabitFromBackend = HabitCard
