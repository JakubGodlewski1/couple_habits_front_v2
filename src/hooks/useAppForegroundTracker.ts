import { useEffect, useRef, useState } from "react"
import { AppState, AppStateStatus } from "react-native"

export const useAppForegroundTracker = () => {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)
  const [loadedFromBackground, setLoadedFromBackground] = useState(false)

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setLoadedFromBackground(true)
      }

      appStateRef.current = nextAppState
    })

    return () => subscription.remove()
  }, [])

  const resetLoadedFromBackground = () => setLoadedFromBackground(false)

  return { loadedFromBackground, resetLoadedFromBackground }
}
