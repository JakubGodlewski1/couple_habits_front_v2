import { useAxios } from "@/api/hooks/useAxios"
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"
import l from "lodash"
import { useOptimisticStatsUpdate } from "@/features/stats/hooks/useOptimisticStatsUpdate"

export const useToggleHabit = () => {
  const { getAxiosInstance } = useAxios()
  const { optimisticStatsUpdate } = useOptimisticStatsUpdate()

  const queryClient = useQueryClient()
  const isFetching = useIsFetching({ queryKey: queryKeys.habits.get }) > 0

  const optimisticHabitUpdate = ({
    id,
    action,
  }: {
    action: "add" | "subtract"
    id: number
  }) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitsFromBackend) => {
        if (!habits.user || !habits.user.length) return habits

        const habitToUpdate = l.cloneDeep(habits.user.find((h) => h.id === id)!)
        habitToUpdate.completedCount += action === "add" ? 1 : -1
        habitToUpdate.strike = action === "add" ? 1 : -1

        return {
          partner: habits.partner,
          user: habits.user.map((h) => (h.id === id ? habitToUpdate : h)),
        } as HabitsFromBackend
      },
    )
  }

  const toggleHabitMutation = async ({
    id,
    action,
  }: {
    action: "add" | "subtract"
    id: number
  }) => {
    //optimistic updates
    optimisticHabitUpdate({
      action,
      id,
    })

    optimisticStatsUpdate({
      habitId: id,
      isCompleted: action === "add",
    })

    const axios = await getAxiosInstance()
    return await axios.put(`/habits/${id}/toggle`, { action })
  }

  const { mutate: toggleHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.toggle,
    mutationFn: toggleHabitMutation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({
        queryKey: queryKeys.statsStrikeCompletion.get,
      })
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
