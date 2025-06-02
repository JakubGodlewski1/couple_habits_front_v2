import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import { View } from "react-native"

type Position = { x: number | null; y: number | null }

export interface RefScreenPositions {
  strike: Position
  points: Position
  homeContainer: Position
}

type TutorialRefType = keyof RefScreenPositions

interface TutorialRefContextType {
  setTutorialRef: (type: TutorialRefType, node: View | null) => void
  refScreenPositions: RefScreenPositions
}

const TutorialRefContext = createContext<TutorialRefContextType | undefined>(
  undefined,
)

export function TutorialRefProvider({ children }: { children: ReactNode }) {
  const [refScreenPositions, setRefScreenPositions] =
    useState<RefScreenPositions>({
      strike: { x: null, y: null },
      points: { x: null, y: null },
      homeContainer: { x: null, y: null },
    })

  const hasUpdated = useRef<Record<TutorialRefType, boolean>>({
    strike: false,
    points: false,
    homeContainer: false,
  })

  const setTutorialRef = useCallback(
    (type: TutorialRefType, node: View | null) => {
      if (!node || hasUpdated.current[type]) return

      node.measure((x, y, width, height, pageX, pageY) => {
        setRefScreenPositions((prev) => {
          const current = prev[type]
          if (current.x === pageX && current.y === pageY) return prev

          return {
            ...prev,
            [type]: { x: pageX, y: pageY },
          }
        })
      })

      hasUpdated.current[type] = true
    },
    [],
  )

  const value = useMemo(
    () => ({ setTutorialRef, refScreenPositions }),
    [refScreenPositions],
  )

  return (
    <TutorialRefContext.Provider value={value}>
      {children}
    </TutorialRefContext.Provider>
  )
}

export function useTutorialRefContext() {
  const context = useContext(TutorialRefContext)
  if (!context) {
    throw new Error(
      "useTutorialRefContext must be used within a TutorialRefProvider",
    )
  }
  return context
}
