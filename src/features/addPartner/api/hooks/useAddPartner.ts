import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { AxiosError } from "axios"
import { showToast } from "@/utils/showToast"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"
import { queryKeys } from "@/config/queryKeys"

export const useAddPartner = () => {
  const { getAxiosInstance } = useAxios()
  const queryClient = useQueryClient()
  const { setIsHidden } = useHideTabbarContext()

  const addPartnerMutation = async (connectionCode: string) => {
    const axios = await getAxiosInstance()
    await axios.post("/game-accounts", {
      connectionCode: connectionCode.toUpperCase(),
    })
  }

  const {
    error,
    isPending,
    mutate: addPartner,
  } = useMutation<void, AxiosError, string>({
    onSuccess: () => {
      setIsHidden(false)
      router.replace("/home")
      showToast({
        type: "success",
        message: "Partner connected!",
        extraMessage: "Add your first habit",
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.users.get,
      })
      queryClient.refetchQueries({
        queryKey: queryKeys.avatars.get,
      })
    },

    mutationFn: addPartnerMutation,
    mutationKey: queryKeys.gameAccounts.addPartner,
  })

  return { addPartner, error, isPending }
}
