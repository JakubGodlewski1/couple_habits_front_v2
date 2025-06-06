import { Socket } from "socket.io-client"
import { showToast } from "@/utils/showToast"
import { useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { useAlert } from "@/hooks/useAlert"
import { queryKeys } from "@/config/queryKeys"

export const useAppEvents = () => {
  const queryClient = useQueryClient()
  const { setIsHidden } = useHideTabbarContext()
  const { openAlert } = useAlert()

  const initAppEvents = (socketInstance: Socket) => {
    //habit
    socketInstance.on("habit.alter", () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
    })

    socketInstance.on("habit.toggle", () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.get })
      queryClient.invalidateQueries({ queryKey: queryKeys.statsState.get })
    })

    //connecting with a partner
    socketInstance.on("user.connect", async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.get })
      await queryClient.invalidateQueries({ queryKey: queryKeys.avatars.get })
      router.replace("/home")
      setIsHidden(false)
      showToast({
        type: "success",
        message: "Partner connected!",
        extraMessage: "Add your first habit",
      })
    })

    //  avatar
    socketInstance.on("avatar.update", () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.avatars.get })
    })

    //partner requests
    socketInstance.on("partner-requests", async () => {
      await queryClient.refetchQueries()
    })

    //custom
    socketInstance.on("custom", (data) => {
      if (data?.message) {
        openAlert(data.message)
      }
    })
  }

  return { initAppEvents }
}
