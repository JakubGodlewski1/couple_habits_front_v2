import { useMutation } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { FeedbackFormType } from "@/features/feedback/types/feedback"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { router } from "expo-router"
import { queryKeys } from "@/config/queryKeys"

export const useSendFeedbackForm = (
  { onSettled }: { onSettled: () => void } = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()

  const sendFeedbackMutation = async (data: FeedbackFormType) => {
    const axios = await getAxiosInstance()
    return await axios.post("/feedbacks", data)
  }

  const { mutate: sendFeedback, isPending } = useMutation({
    mutationFn: sendFeedbackMutation,
    mutationKey: queryKeys.feedback.send,
    onError: (error) => {
      showToast({
        type: "error",
        message: getAxiosErrorMessage(error) || "Something went wrong",
      })
    },
    onSuccess: () => {
      showToast({
        type: "success",
        message: "The feedback has been sent. Thank you!",
      })

      router.replace("/home")
    },
    onSettled,
  })

  return { sendFeedback, isPending }
}
