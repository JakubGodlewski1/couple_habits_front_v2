import { useAxios } from "@/api/hooks/useAxios"
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { queryKeys } from "@/config/queryKeys"

export const useToggleHabit = () => {
  const { getAxiosInstance } = useAxios()

  const queryClient = useQueryClient()
  const isFetching = useIsFetching({ queryKey: queryKeys.habits.get }) > 0

  const toggleHabitMutation = async ({
    id,
    isCompleted,
  }: {
    isCompleted: boolean
    id: number
  }) => {
    const axios = await getAxiosInstance()
    return await axios.patch(`/habits/${id}`, { isCompleted })
  }

  const { mutate: toggleHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.toggle,
    mutationFn: toggleHabitMutation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.statsState.get })
    },
    onError: (err) => {
      showToast({
        type: "error",
        message:
          getAxiosErrorMessage(err) ||
          "Could not toggle habit, try again later",
      })
    },
  })

  return { toggleHabit, isPending: isPending || isFetching }
}
