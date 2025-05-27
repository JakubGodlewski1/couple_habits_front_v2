import { useAxios } from "@/api/hooks/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { queryKeys } from "@/config/queryKeys"
import { HabitFormType } from "@/features/habits/types/habitForm"
import { HabitsFromBackend } from "@/features/habits/types/habit"
import { Alert } from "react-native"

export const useCreateHabit = (
  { onSettled }: { onSettled?: () => void } = { onSettled: () => {} },
) => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const habitOptimisticUpdate = ({ label, frequency }: HabitFormType) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitsFromBackend) => {
        return {
          partner: habits.partner,
          user: [
            ...habits.user,
            {
              label,
              frequency,
              isCompleted: false,
              strike: 0,
              id:
                Math.floor(Math.random() * (10_000_000 - 1_000_000 + 1)) +
                1_000_000,
            },
          ],
        } as HabitsFromBackend
      },
    )
  }

  const createHabitMutation = async (data: HabitFormType) => {
    //optimistic update
    habitOptimisticUpdate(data)

    const axios = await getAxiosInstance()
    return await axios.post(`/habits`, data)
  }

  const { mutate: createHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.create,
    mutationFn: createHabitMutation,
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Habit added successfully",
      })
    },
    onSettled: () => {
      if (onSettled) onSettled()
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
