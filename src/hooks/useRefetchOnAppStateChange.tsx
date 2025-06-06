import { useEffect, useRef } from "react"
import { AppState, AppStateStatus } from "react-native"
import { useQueryClient } from "@tanstack/react-query"

export default function useRefetchOnAppStateChange() {
  const queryClient = useQueryClient()

  const appStateRef = useRef<AppStateStatus>(AppState.currentState)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      )
        queryClient.refetchQueries()

      appStateRef.current = nextAppState
    })

    return () => subscription.remove()
  }, [])
}
