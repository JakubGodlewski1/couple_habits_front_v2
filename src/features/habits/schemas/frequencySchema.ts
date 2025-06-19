import { z } from "zod"

// Define the RepeatValue and SpecificDaysValue constraints
const repeatValueSchema = z.enum(["daily", "weekly", "monthly"])
const specificDaysValueSchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
])

// Define the Frequency schema
const frequencySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("repeat"),
    value: repeatValueSchema,
  }),
  z.object({
    type: z.literal("specificDays"),
    value: z.array(specificDaysValueSchema).min(1),
  }),
])

export { repeatValueSchema, specificDaysValueSchema, frequencySchema }
