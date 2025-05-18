import { FrequencyType } from "@/features/habits/types/habitForm"

export const FREQUENCY_OPTIONS: { key: FrequencyType; label: string }[] = [
  {
    label: "Repeat",
    key: "repeat",
  },
  {
    label: "Specific days",
    key: "specificDays",
  },
]

export const SHORT_DAY_NAMES_MAP = {
  monday: "md",
  tuesday: "tu",
  wednesday: "wd",
  thursday: "th",
  friday: "fr",
  saturday: "sa",
  sunday: "su",
} as const
