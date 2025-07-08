import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"

export const useUpdateReward = (
  { onSettled }: { onSettled: () => void } = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const updateRewardFn = async ({
    data,
    id,
  }: {
    data: RewardsForm
    id: number
  }) => {
    const axios = await getAxiosInstance()
    const res = await axios.put(`/rewards/${id}`, data)
    return await res.data
  }

  const { isPending, mutate, error } = useMutation({
    mutationKey: queryKeys.rewards.update,
    mutationFn: updateRewardFn,
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Reward updated successfully",
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

  return { isPending, error, update: mutate }
}
