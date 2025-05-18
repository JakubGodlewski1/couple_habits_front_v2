import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { withWarning } from "@/utils/withWarning"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { queryKeys } from "@/config/queryKeys"

type Props = {
  onSettled?: () => void
}

export default function useTakeDayOff(
  { onSettled }: Props = { onSettled: () => {} },
) {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()

  const takeDayOffMutation = async (): Promise<void> => {
    const axios = await getAxiosInstance()
    return axios.patch("/days-off")
  }

  const {
    mutateAsync: takeDayOffAsync,
    mutate: takeDayOff,
    isPending,
    error,
  } = useMutation({
    mutationKey: queryKeys.dayOff.take,
    mutationFn: takeDayOffMutation,
    onError: (error) => {
      showToast({
        type: "error",
        message: getAxiosErrorMessage(error) || "Something went wrong",
      })
    },
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Congrats. Enjoy your day off!",
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dayOff.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      if (onSettled) onSettled()
    },
  })

  const takeDayOffWithWarning = () =>
    withWarning({
      message: "Are you sure you want to take a day off?",
      btnLabel: "Yes",
      onPress: takeDayOff,
    })

  return {
    takeDayOffWithWarning,
    takeDayOffAsync,
    takeDayOff,
    isPending,
    error,
  }
}
