import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react"
import { TutorialStore, TutorialSeenMap } from "../utils/tutorialStore"

const store = new TutorialStore()

type Context = {
  seenTutorials: TutorialSeenMap
  setTutorialSeen: (tutorial: TutorialType, seen: boolean) => Promise<void>
  isLoading: boolean
}

export const TutorialContext = createContext<Context>({
  seenTutorials: {
    discordInvite: false,
    connection: false,
    firstHabit: false,
    partnerAvatar: false,
    intro: false,
  },
  setTutorialSeen: async () => {},
  isLoading: true,
})

export const TutorialContextProvider = ({ children }: PropsWithChildren) => {
  const [seenTutorials, setSeenTutorials] = useState<TutorialSeenMap>({
    discordInvite: false,
    connection: false,
    firstHabit: false,
    partnerAvatar: false,
    intro: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    store.getAll().then((data) => {
      setSeenTutorials(data)
      setIsLoading(false)
    })
  }, [])

  const setTutorialSeen = useCallback(
    async (type: TutorialType, seen: boolean) => {
      await store.set(type, seen)
      setSeenTutorials((prev) => ({
        ...prev,
        [type]: seen,
      }))
    },
    [],
  )

  return (
    <TutorialContext.Provider
      value={{
        seenTutorials,
        setTutorialSeen,
        isLoading,
      }}
    >
      {children}
    </TutorialContext.Provider>
  )
}

export const useTutorialContext = () => useContext(TutorialContext)
