import { z } from "zod"

export const resetPasswordSchemaFazeOne = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not correct",
    }),
})
export const resetPasswordSchemaFazeTwo = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .length(6, "Code should be 6 characters long"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password is too short")
    .max(30, "Password is too long"),
})
