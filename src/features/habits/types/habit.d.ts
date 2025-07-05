import { HabitFormType } from "@/features/habits/types/habitForm"
import { HabitFromBackend } from "@/features/habits/types/habitCard"

type CreateHabit = HabitFormType

type UpdateHabit = Omit<CreateHabit, "isShared">

type HabitsFromBackend = {
  user: HabitFromBackend[]
  partner: HabitFromBackend[]
}
