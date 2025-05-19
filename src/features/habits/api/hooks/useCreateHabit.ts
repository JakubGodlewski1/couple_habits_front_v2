import { useAxios } from "@/api/hooks/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { CreateHabit } from "@/features/habits/types/habit"
import { queryKeys } from "@/config/queryKeys"

export const useCreateHabit = () => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const habitOptimisticUpdate = ({ label, frequency, id }: CreateHabit) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitFromBackend[]) => {
        return [
          ...habits,
          {
            id,
            frequency,
            label,
            strike: 0,
          },
        ] as HabitFromBackend[]
      },
    )
  }

  const createHabitMutation = async (data: CreateHabit) => {
    //optimistic update
    habitOptimisticUpdate(data)

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
