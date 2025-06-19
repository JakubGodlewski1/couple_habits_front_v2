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
