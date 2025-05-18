import { z } from "zod"

export const onboardingFormSchema = z
  .object({
    partnerName: z
      .string({
        required_error: "Partner's name is required",
      })
      .min(2, "The name is too short")
      .max(30, "The name is too long"),
  })
  .strict({
    message: "Onboarding object contains incorrect data",
  })
