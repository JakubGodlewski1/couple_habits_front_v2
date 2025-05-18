import { z } from "zod"

export const signUpFormSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email should be of string type",
        required_error: "Email is required",
      })
      .email("Provided email has wrong structure")
      .max(60, "Provided email is too long, max 60 characters"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password has wrong format",
      })
      .min(6, "Password has to be at least 6 characters long")
      .max(50, "Password can't be longer than 50 characters"),
    passwordConfirmation: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Password confirmation has wrong format",
      })
      .min(6, "Password has to be at least 6 characters long")
      .max(50, "Password can't be longer than 50 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })
