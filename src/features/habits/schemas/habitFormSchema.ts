import { z } from "zod"
import { frequencySchema } from "@/features/habits/schemas/frequencySchema"

// Define CreateHabit type validator
export const habitFormSchema = z
  .object({
    frequency: frequencySchema,
    isShared: z.boolean().optional().nullable(),
    label: z
      .string()
      .min(2, "Label is too short.")
      .max(50, "Label is too long. max 50 characters"),
    goalType: z.union([z.literal("atLeast"), z.literal("atMost")], {
      required_error: "goal type is required",
      invalid_type_error: "goal type should be either atLeast or atMost",
    }),
    targetCount: z.number({
      required_error: "Target count is required",
      invalid_type_error: "Target count should be a number",
    }),
  })
  .strict()
