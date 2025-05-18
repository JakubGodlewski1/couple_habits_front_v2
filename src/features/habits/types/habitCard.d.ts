import { DayOfTheWeek } from "@/types/daysOfWeek"

export type HabitFromBackend = {
  id: string
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
  user: {
    label: string
    isCompleted: boolean
  }
  partner: {
    label: string
    isCompleted: boolean
  }
}
