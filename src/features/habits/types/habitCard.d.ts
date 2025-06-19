import { Frequency, GoalType } from "@/features/habits/types/habitForm"

export type HabitCard = {
  id: number
  strike: number
  frequency: Frequency
  label: string
  targetCount: number
  completedCount: number
  goalType: GoalType
  createdAt: string
}

export type HabitFromBackend = HabitCard
