import { HabitFormType } from "@/features/habits/types/habitForm"
import { HabitFromBackend } from "@/features/habits/types/habitCard"

type CreateHabit = HabitFormType & { id: number }

type HabitsFromBackend = {
  user: HabitFromBackend[]
  partner: HabitFromBackend[]
}
