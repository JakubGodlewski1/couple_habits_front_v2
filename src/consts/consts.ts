export const HABIT_STATE_TABS = [
  { key: "todo", label: "Todo" },
  { key: "completed", label: "Completed" },
  { key: "all", label: "All" },
] as const

export const DAYS_OF_THE_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const

export const DAYS_OF_THE_WEEK_TO_INT = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const

export const DAYS_OF_THE_WEEK_FROM_INT = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
} as const
