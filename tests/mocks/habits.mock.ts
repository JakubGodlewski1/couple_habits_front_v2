import { Frequency } from "../../src/features/habits/types/habitForm"
import { DayOfTheWeek } from "../../src/types/daysOfWeek"

type Props = {
  isCompleted: {
    user: boolean
    partner: boolean
  }
  frequency: Frequency
}

const createHabit = ({ isCompleted: { user, partner }, frequency }: Props) => ({
  id: Math.random(),
  strike: 0,
  user: {
    isCompleted: user,
    label: "run",
  },
  partner: {
    isCompleted: partner,
    label: "read",
  },
  frequency,
})

const createSpecificDaysFrequency = (days: DayOfTheWeek[]): Frequency => {
  return {
    type: "specificDays",
    value: days,
  }
}

/*habits*/
const dailyCompleted = [
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "daily" },
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "daily" },
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "daily" },
  }),
]

const dailyUncompleted = [
  createHabit({
    isCompleted: { user: false, partner: true },
    frequency: { type: "repeat", value: "daily" },
  }),
  createHabit({
    isCompleted: { user: true, partner: false },
    frequency: { type: "repeat", value: "daily" },
  }),
  createHabit({
    isCompleted: { user: false, partner: false },
    frequency: { type: "repeat", value: "daily" },
  }),
]

const weeklyCompleted = [
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "weekly" },
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "weekly" },
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: { type: "repeat", value: "weekly" },
  }),
]

const weeklyUncompleted = [
  createHabit({
    isCompleted: { user: false, partner: true },
    frequency: { type: "repeat", value: "weekly" },
  }),
  createHabit({
    isCompleted: { user: true, partner: false },
    frequency: { type: "repeat", value: "weekly" },
  }),
  createHabit({
    isCompleted: { user: false, partner: false },
    frequency: { type: "repeat", value: "weekly" },
  }),
]

const specificDaysCompleted = [
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
  createHabit({
    isCompleted: { user: true, partner: true },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
]

const specificDaysUncompleted = [
  createHabit({
    isCompleted: { user: false, partner: true },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
  createHabit({
    isCompleted: { user: true, partner: false },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
  createHabit({
    isCompleted: { user: false, partner: false },
    frequency: createSpecificDaysFrequency(["monday", "tuesday", "wednesday"]),
  }),
]

export const mockHabits = {
  dailyCompleted,
  dailyUncompleted,
  weeklyCompleted,
  weeklyUncompleted,
  specificDaysCompleted,
  specificDaysUncompleted,
}
