import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"
import { Alert } from "react-native"

export const useDeleteReward = (
  { onSettled }: { onSettled: () => void } = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const deleteRewardFn = async (id: number) => {
    const axios = await getAxiosInstance()
    const res = await axios.delete(`/rewards/${id}`)
    return res.data
  }

  const { isPending, mutate, error } = useMutation({
    mutationKey: queryKeys.rewards.delete,
    mutationFn: deleteRewardFn,
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Reward deleted successfully",
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

  // Confirmation wrapper
  const confirmAndDelete = (id: number) => {
    Alert.alert(
      "Delete Reward",
      "Are you sure you want to delete the reward?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => mutate(id),
        },
      ],
      { cancelable: true },
    )
  }

  return {
    isPending,
    error,
    deleteReward: mutate,
    deleteRewardWithConfirmation: confirmAndDelete,
  }
}
