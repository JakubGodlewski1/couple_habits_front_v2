import { HabitFromBackend } from "../types/habitCard"
import { CreateHabit } from "@/features/habits/types/habit"
import { HabitFormType } from "@/features/habits/types/habitForm"
import { isLastDayOfMonth, isSunday } from "date-fns"
import { DAYS_OF_THE_WEEK_FROM_INT } from "@/consts/consts"

const daily = ({ frequency }: HabitFromBackend | CreateHabit | HabitFormType) =>
  frequency.type === "repeat" && frequency.value === "daily"

const weekly = ({
  frequency,
}: HabitFromBackend | CreateHabit | HabitFormType) =>
  frequency.type === "repeat" && frequency.value === "weekly"

const monthly = ({
  frequency,
}: HabitFromBackend | CreateHabit | HabitFormType) =>
  frequency.type === "repeat" && frequency.value === "monthly"

const specificDays = ({
  frequency,
}: HabitFromBackend | CreateHabit | HabitFormType) =>
  frequency.type === "specificDays"

const scheduledForThisWeek = weekly
const scheduledForThisMonth = monthly

const isCompleted = ({
  completedCount,
  targetCount,
  goalType,
}: HabitFromBackend) =>
  goalType === "atLeast"
    ? completedCount >= targetCount
    : completedCount <= targetCount

const isIncompleted = ({
  completedCount,
  targetCount,
  goalType,
}: HabitFromBackend) =>
  !(goalType === "atLeast"
    ? completedCount >= targetCount
    : completedCount <= targetCount)

const scheduledForToday = ({
  frequency,
}: HabitFromBackend | CreateHabit | HabitFormType) => {
  const todayDayOfTheWeek =
    new Date().getDay() as keyof typeof DAYS_OF_THE_WEEK_FROM_INT

  if (frequency.type === "specificDays") {
    return frequency.value.includes(
      DAYS_OF_THE_WEEK_FROM_INT[todayDayOfTheWeek],
    )
  }

  return frequency.type === "repeat" && frequency.value === "daily"
}

const scheduledForTodayIncludingWeeklyAndMonthly = ({
  frequency,
}: HabitFromBackend | CreateHabit | HabitFormType) =>
  scheduledForToday({ frequency } as
    | HabitFromBackend
    | CreateHabit
    | HabitFormType) ||
  (frequency.type === "repeat" &&
    frequency.value === "weekly" &&
    isSunday(new Date())) ||
  (frequency.type === "repeat" &&
    frequency.value === "monthly" &&
    isLastDayOfMonth(new Date()))

type HabitFilterFunction<
  T extends HabitFromBackend | CreateHabit | HabitFormType,
> = (habit: T) => boolean

export const habitFilters: {
  daily: HabitFilterFunction<HabitFromBackend | CreateHabit | HabitFormType>
  weekly: HabitFilterFunction<HabitFromBackend | CreateHabit | HabitFormType>
  monthly: HabitFilterFunction<HabitFromBackend | CreateHabit | HabitFormType>
  specificDays: HabitFilterFunction<
    HabitFromBackend | CreateHabit | HabitFormType
  >
  scheduledForThisWeek: HabitFilterFunction<
    HabitFromBackend | CreateHabit | HabitFormType
  >
  scheduledForThisMonth: HabitFilterFunction<
    HabitFromBackend | CreateHabit | HabitFormType
  >

  scheduledForToday: HabitFilterFunction<
    HabitFromBackend | CreateHabit | HabitFormType
  >
  scheduledForTodayIncludingWeeklyAndMonthly: HabitFilterFunction<
    HabitFromBackend | CreateHabit | HabitFormType
  >

  isCompleted: HabitFilterFunction<HabitFromBackend>
  isIncompleted: HabitFilterFunction<HabitFromBackend>
} = {
  monthly,
  isCompleted,
  isIncompleted,
  scheduledForThisMonth,
  daily,
  weekly,
  specificDays,
  scheduledForThisWeek,
  scheduledForTodayIncludingWeeklyAndMonthly,
  scheduledForToday,
}
