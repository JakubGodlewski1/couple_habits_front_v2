import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"

export const useCreateReward = (
  { onSettled }: { onSettled: () => void } = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const createRewardFn = async (data: RewardsForm) => {
    const axios = await getAxiosInstance()
    const res = await axios.post("/rewards", data)
    return await res.data
  }

  const { isPending, mutate, error } = useMutation({
    mutationKey: queryKeys.rewards.create,
    mutationFn: createRewardFn,
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Reward created successfully",
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rewards.get,
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

  return { isPending, error, create: mutate }
}
