import { Frequency } from "@/features/habits/types/habitForm"

export type HabitCard = {
  id: number
  strike: number
  frequency: Frequency
  label: string
  isCompleted: boolean
}

export type HabitFromBackend = HabitCard
