import { useAxios } from "@/api/hooks/useAxios"
import { HabitFormType } from "@/features/habits/types/habitForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import l from "lodash"
import { queryKeys } from "@/config/queryKeys"

export const useUpdateHabit = () => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const habitOptimisticUpdate = ({
    data: { label, frequency },
    id,
  }: {
    data: HabitFormType
    id: number
  }) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitFromBackend[]) => {
        if (!habits || !habits.length) return []

        const habitToUpdate = l.cloneDeep(habits.find((h) => h.id === id)!)
        habitToUpdate.frequency = frequency
        habitToUpdate.label = label

        return habits.map((h) => (h.id === id ? habitToUpdate : h))
      },
    )
  }

  const updateHabitMutation = async ({
    id,
    data,
  }: {
    data: HabitFormType
    id: number
  }) => {
    habitOptimisticUpdate({
      data,
      id,
    })

    const axios = await getAxiosInstance()
    return await axios.put(`/habits/${id}`, data)
  }

  const {
    mutate: updateHabit,
    mutateAsync: updateHabitAsync,
    isPending,
  } = useMutation({
    mutationKey: queryKeys.habits.update,
    mutationFn: updateHabitMutation,
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

  return { updateHabit, updateHabitAsync, isPending }
}
