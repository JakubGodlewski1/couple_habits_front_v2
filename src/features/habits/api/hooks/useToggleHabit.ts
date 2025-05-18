import { useAxios } from "@/api/hooks/useAxios"
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { useOptimisticStatsUpdateOnHabitCTUD } from "@/features/stats/hooks/useOptimisticStatsUpdateOnHabitCTUD"
import { useOptimisticHabitUpdateOnToggle } from "@/features/habits/hooks/useOptimisticHabitUpdateOnToggle"
import { queryKeys } from "@/config/queryKeys"

export const useToggleHabit = () => {
  const { getAxiosInstance } = useAxios()
  const { onHabitCTUDUpdateStats, onToggleUpdateLocalPoints } =
    useOptimisticStatsUpdateOnHabitCTUD()
  const { onToggleUpdateHabit } = useOptimisticHabitUpdateOnToggle()

  const queryClient = useQueryClient()
  const isFetching = useIsFetching({ queryKey: queryKeys.habits.get }) > 0

  const completeHabitMutation = async ({
    id,
    isCompleted,
  }: {
    isCompleted: boolean
    id: string
  }) => {
    //optimistic updates
    onToggleUpdateHabit({
      id,
      isCompleted,
    })

    onToggleUpdateLocalPoints({ id })

    onHabitCTUDUpdateStats()

    //rest of query
    const axios = await getAxiosInstance()
    return await axios.patch(`/habits/${id}/completion`, { isCompleted })
  }

  const { mutate: toggleHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.complete,
    mutationFn: completeHabitMutation,
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
          "Could not complete habit, try again later",
      })
    },
  })

  return { toggleHabit, isPending: isPending || isFetching }
}
