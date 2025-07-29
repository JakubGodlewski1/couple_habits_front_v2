import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react"
import { Dimensions, Animated, View, Text } from "react-native"
import ConfettiCannon from "react-native-confetti-cannon"

type StartConfettiOptions = {
  message?: string
}

type ConfettiContextType = {
  startConfetti: (options?: StartConfettiOptions) => void
}

const ConfettiContext = createContext<ConfettiContextType | null>(null)

export const ConfettiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFiring, setIsFiring] = useState(false)
  const [origin] = useState({
    x: Dimensions.get("window").width / 2,
    y: 0,
  })

  // Message state
  const [message, setMessage] = useState<string | null>(null)
  const opacity = useRef(new Animated.Value(0)).current

  const showMessage = useCallback(
    (text: string) => {
      setTimeout(() => {
        setMessage(text)

        // Fade in
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Fade out after delay
          setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => setMessage(null))
          }, 1500)
        })
      }, 300) // Delay before showing message
    },
    [opacity],
  )

  const startConfetti = useCallback(
    (options?: StartConfettiOptions) => {
      if (options?.message) {
        showMessage(options.message)
      }
      setIsFiring(true) // Trigger confetti
    },
    [showMessage],
  )

  return (
    <ConfettiContext.Provider value={{ startConfetti }}>
      {children}

      {/* Confetti (only render when firing) */}
      {isFiring && (
        <ConfettiCannon
          count={100}
          origin={origin}
          fadeOut={true}
          autoStart={true}
          onAnimationEnd={() => setIsFiring(false)}
        />
      )}

      {/* Message Overlay */}
      {message && (
        <View className="absolute inset-0" pointerEvents="none">
          <Animated.View
            style={{ opacity }}
            className="flex-1 justify-center items-center"
          >
            <Text className="text-white bg-black/60 text-3xl font-bold p-6 rounded-lg text-center max-w-[60vw]">
              {message}
            </Text>
          </Animated.View>
        </View>
      )}
    </ConfettiContext.Provider>
  )
}

export function useConfetti() {
  const context = useContext(ConfettiContext)
  if (!context) {
    throw new Error("useConfetti must be used within a ConfettiProvider")
  }
  return context
}
