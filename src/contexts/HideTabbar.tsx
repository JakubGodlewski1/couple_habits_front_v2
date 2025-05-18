import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { moveRight } from "../lib/animations/moveRight"

interface HideTabbarContextType {
  setIsHidden: (value: boolean) => void
  animatedPosition: { right: number }
}

const HideTabbar = createContext<HideTabbarContextType>({
  setIsHidden: () => {},
  animatedPosition: { right: 0 },
})

export const HideTabbarProvider = ({ children }: PropsWithChildren) => {
  const [isHidden, setIsHidden] = useState(false)
  const { animatedPosition, onStart, onEnd } = moveRight(0)

  useEffect(() => {
    if (isHidden) {
      onStart()
    } else onEnd()
  }, [isHidden])

  return (
    <HideTabbar.Provider
      value={{
        setIsHidden: (value: boolean) => setIsHidden(value),
        animatedPosition,
      }}
    >
      {children}
    </HideTabbar.Provider>
  )
}

export const useHideTabbarContext = () => useContext(HideTabbar)
