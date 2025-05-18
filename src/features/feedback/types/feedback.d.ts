import { z } from "zod"
import { feedbackFormSchema } from "@/features/feedback/schemas/feedbackFormSchema"

type FeedbackFormType = z.infer<typeof feedbackFormSchema>
