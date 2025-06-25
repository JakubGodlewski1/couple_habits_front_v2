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
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useSkipHabit = () => {
  const { getAxiosInstance } = useAxios()
  const user = useGetUser().user!

  const queryClient = useQueryClient()
  const isFetching = useIsFetching({ queryKey: queryKeys.habits.get }) > 0

  const optimisticHabitUpdate = ({ id }: { id: number }) => {
    queryClient.setQueryData(
      queryKeys.habits.get,
      (habits: HabitsFromBackend) => {
        if (!habits.partner || !habits.partner.length) return habits

        const habitToUpdate = l.cloneDeep(
          habits.partner.find((h) => h.id === id)!,
        )
        habitToUpdate.completedCount =
          habitToUpdate.goalType === "atLeast" ? habitToUpdate.targetCount : 0

        return {
          partner: habits.partner.map((h) => (h.id === id ? habitToUpdate : h)),
          user: habits.user,
        } as HabitsFromBackend
      },
    )
  }

  const optimisticPointsUpdate = () => {
    if (!user?.habitSkipPrice) return

    queryClient.setQueryData(
      queryKeys.stats.get,
      (stats: StatsFromBackend) => ({
        ...stats,
        points: stats!.points! - user.habitSkipPrice,
      }),
    )
  }

  const skipHabitMutation = async ({ id }: { id: number }) => {
    //optimistic updates
    optimisticHabitUpdate({
      id,
    })

    optimisticPointsUpdate()

    const axios = await getAxiosInstance()
    return await axios.post(`/habits/${id}/skip`)
  }

  const { mutate: skipHabit, isPending } = useMutation({
    mutationKey: queryKeys.habits.skip,
    mutationFn: skipHabitMutation,
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
          getAxiosErrorMessage(err) || "Could not skip habit, try again later",
      })
    },
  })

  return { skipHabit, isPending: isPending || isFetching }
}
