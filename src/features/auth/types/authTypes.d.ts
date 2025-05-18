import { z } from "zod"
import { signUpFormSchema } from "@/features/auth/schemas/signUpFormSchema"
import { signInFormSchema } from "@/features/auth/schemas/signInSchema"

type SignUpForm = z.infer<typeof signUpFormSchema>
type SignInForm = z.infer<typeof signInFormSchema>
