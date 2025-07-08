import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"

type Props = {
  onSettled?: () => void
}

export const useBuyOrUseReward = (
  { onSettled = () => {} }: Props = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const buyOrUseRewardFn = async ({
    id,
    action,
  }: {
    id: number
    action: "buy" | "use"
  }) => {
    const axios = await getAxiosInstance()
    const res = await axios.patch(`/rewards/${id}`, { action })
    return await res.data
  }

  const { isPending, mutate, error } = useMutation({
    mutationKey: queryKeys.rewards.buyOrUse,
    mutationFn: buyOrUseRewardFn,
    onSuccess: (_data, variables) => {
      if (variables.action === "buy") {
        showToast({
          type: "success",
          message: "Reward bought successfully",
        })
      } else if (variables.action === "use") {
        showToast({
          type: "success",
          message: "Reward used successfully",
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rewards.get,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.stats.get,
      })
      onSettled()
    },
    onError: () => {
      showToast({
        type: "error",
        message: "Something went wrong, try again later",
      })
    },
  })

  return { isPending, error, update: mutate }
}
