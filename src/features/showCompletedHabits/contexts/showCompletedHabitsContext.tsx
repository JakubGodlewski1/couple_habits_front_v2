import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "showCompletedHabits"

type ShowCompletedHabitsContextType = {
  showCompletedHabits: boolean
  setShowCompletedHabits: (value: boolean) => void
}

export const ShowCompletedHabitsContext =
  createContext<ShowCompletedHabitsContextType>({
    showCompletedHabits: false,
    setShowCompletedHabits: () => {},
  })

export const ShowCompletedHabitsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showCompletedHabits, setShowCompletedHabitsState] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored !== null) {
          console.log({ stored })
          setShowCompletedHabitsState(stored === "true")
        }
      } catch (err) {
        console.error("Failed to load showCompletedHabits:", err)
      } finally {
        setIsLoaded(true)
      }
    }
    load()
  }, [])

  const setShowCompletedHabits = (value: boolean) => {
    setShowCompletedHabitsState(value)
    AsyncStorage.setItem(STORAGE_KEY, value.toString()).catch((err) =>
      console.error("Failed to save showCompletedHabits:", err),
    )
  }

  if (!isLoaded) return null

  return (
    <ShowCompletedHabitsContext.Provider
      value={{ showCompletedHabits, setShowCompletedHabits }}
    >
      {children}
    </ShowCompletedHabitsContext.Provider>
  )
}

export const useShowCompletedHabitsContext = () =>
  useContext(ShowCompletedHabitsContext)
