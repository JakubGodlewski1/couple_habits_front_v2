import { useAxios } from "@/api/hooks/useAxios"
import { HabitFormType } from "@/features/habits/types/habitForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import l from "lodash"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"

type Props = {
  onSettled?: () => void
  onSuccess?: () => void
}

export const useUpdateHabit = ({ onSettled, onSuccess }: Props) => {
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
      (habits: HabitsFromBackend) => {
        if (!habits.user || !habits.user.length) return habits

        const habitToUpdate = l.cloneDeep(habits.user.find((h) => h.id === id)!)
        habitToUpdate.frequency = frequency
        habitToUpdate.label = label

        return {
          partner: habits.partner,
          user: habits.user.map((h) => (h.id === id ? habitToUpdate : h)),
        } as HabitsFromBackend
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
      if (onSettled) onSettled()
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({
        queryKey: queryKeys.statsStrikeCompletion.get,
      })
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
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
