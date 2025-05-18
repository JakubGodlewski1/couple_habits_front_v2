import { useAxios } from "@/api/hooks/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { CreateHabit } from "@/features/habits/types/habit"
import { useOptimisticStatsUpdateOnHabitCTUD } from "@/features/stats/hooks/useOptimisticStatsUpdateOnHabitCTUD"
import { queryKeys } from "@/config/queryKeys"

export const useCreateHabit = () => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()
  const { onHabitCTUDUpdateStats } = useOptimisticStatsUpdateOnHabitCTUD()

  const habitOptimisticUpdate = ({
    userLabel,
    partnerLabel,
    frequency,
    id,
  }: CreateHabit) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitFromBackend[]) => {
        return [
          ...habits,
          {
            id,
            user: {
              isCompleted: false,
              label: userLabel,
            },
            frequency,
            partner: {
              label: partnerLabel,
              isCompleted: false,
            },
            strike: 0,
          },
        ] as HabitFromBackend[]
      },
    )
  }

  const createHabitMutation = async (data: CreateHabit) => {
    //optimistic updates
    habitOptimisticUpdate(data)
    onHabitCTUDUpdateStats()

    const axios = await getAxiosInstance()
    return await axios.post(`/habits`, data)
  }

  const { mutate: createHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.create,
    mutationFn: createHabitMutation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.statsState.get })
    },
    onError: (err) => {
      showToast({
        type: "error",
        message: err.message,
      })
    },
  })

  return { createHabit, isPending }
}
