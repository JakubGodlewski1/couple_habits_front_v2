import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppForegroundTracker } from "@/hooks/useAppForegroundTracker"

export default function useRefetchOnAppStateChange() {
  const queryClient = useQueryClient()
  const { loadedFromBackground, resetLoadedFromBackground } =
    useAppForegroundTracker()

  useEffect(() => {
    if (!loadedFromBackground) return
    queryClient.refetchQueries()
    resetLoadedFromBackground()
  }, [loadedFromBackground])
}
