import { z } from "zod"
import { frequencySchema } from "@/features/habits/schemas/frequencySchema"

// Define CreateHabit type validator
export const habitFormSchema = z
  .object({
    frequency: frequencySchema,
    label: z
      .string()
      .min(2, "Label is too short.")
      .max(50, "Label is too long. max 50 characters"),
  })
  .strict()
