import { useAxios } from "@/api/hooks/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { withWarning } from "@/utils/withWarning"
import { showToast } from "@/utils/showToast"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"

export const useDeleteHabit = () => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const habitOptimisticUpdate = ({ id }: { id: number }) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitsFromBackend) => {
        if (!habits.user || habits.user.length === 0) return habits

        return {
          user: habits.user.filter((h) => h.id !== id),
          partner: habits.partner,
        }
      },
    )
  }

  const deleteHabitMutation = async (id: number) => {
    //optimistic update
    habitOptimisticUpdate({ id })

    const axios = await getAxiosInstance()
    const res = await axios.delete(`/habits/${id}`)
    return res.data
  }

  const {
    isPending,
    mutate: deleteHabit,
    mutateAsync: deleteHabitAsync,
  } = useMutation({
    mutationFn: deleteHabitMutation,
    mutationKey: queryKeys.habits.delete,
    onError: (error) => {
      showToast({
        type: "error",
        message: error.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({
        queryKey: queryKeys.statsStrikeCompletion.get,
      })
    },
  })

  const deleteHabitWithWarning = (id: number) =>
    withWarning({
      message: "Are you sure you want to delete this Habit?",
      btnLabel: "Delete",
      onPress: () => deleteHabit(id),
    })

  return { deleteHabitWithWarning, deleteHabit, deleteHabitAsync, isPending }
}
