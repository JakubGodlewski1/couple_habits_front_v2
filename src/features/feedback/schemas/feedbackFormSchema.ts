import { z } from "zod"

export const feedbackFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(5, "Email is too short")
      .max(100, "Email is too long")
      .email("Email  is not correct")
      .optional(),
    option: z.enum(["bug", "feature", "question", "general"], {
      message: "Option is not correct",
      required_error: "Option is required",
    }),
    message: z
      .string()
      .min(5, "Your feedback message is too short, min 3 characters.")
      .max(2000, "You feedback message is too long. Max 2000 characters"),
    canBeContacted: z.boolean({
      message: "Checkbox is required",
      required_error: "Checkbox is require",
      invalid_type_error: "Checkbox should be boolean",
    }),
  })
  .strict({
    message: "There are wrong keys in the feedback object",
  })
  .refine((data) => (data.canBeContacted ? data.email : true), {
    message: "The email is required",
    path: ["email"],
  })
