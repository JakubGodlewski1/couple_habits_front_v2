import { useEffect, useRef, useState } from "react"
import { Animated, Easing, View } from "react-native"
import Modal from "@/components/Modal"
import Text from "@/components/Text"
import setup from "@/assets/illustrations/setup.png"

export default function IsLoadingProAccount() {
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const rotateValue = useRef(0)

  // Dot state for controlling visible dots
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    // Pulse animation
    const pulse = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
    Animated.loop(pulse).start()

    // Spin animation every 2s
    const spinInterval = setInterval(() => {
      rotateValue.current += 360
      Animated.timing(rotateAnim, {
        toValue: rotateValue.current,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    }, 2000)

    // Change the number of visible dots every 500ms
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1) // Ensures it stays between 1 to 3
    }, 500)

    return () => {
      clearInterval(spinInterval)
      clearInterval(dotInterval)
    }
  }, [])

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
    extrapolate: "extend",
  })

  // Create the three dots and animate opacity
  const opacityValues = [
    useRef(new Animated.Value(0)).current, // Dot 1
    useRef(new Animated.Value(0)).current, // Dot 2
    useRef(new Animated.Value(0)).current, // Dot 3
  ]

  useEffect(() => {
    // Animate opacity of the dots based on dotCount
    opacityValues.forEach((dot, index) => {
      Animated.timing(dot, {
        toValue: index < dotCount ? 1 : 0, // Show or hide based on dotCount
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start()
    })
  }, [dotCount])

  return (
    <Modal onClose={() => {}} isOpen={true}>
      <View className="p-4 grow">
        <Text className="text-center" type="h1">
          We are setting up your pro account
        </Text>
        <Animated.Image
          resizeMode="contain"
          source={setup}
          style={{
            transform: [{ scale: scaleAnim }, { rotate }],
          }}
          className="mx-auto w-[85vw] h-[400px] max-h-[40vh]"
        />
        <Text className="text-center mt-10" type="h2">
          Just a few more seconds
          <Animated.Text style={{ opacity: opacityValues[0] }}>.</Animated.Text>
          <Animated.Text style={{ opacity: opacityValues[1] }}>.</Animated.Text>
          <Animated.Text style={{ opacity: opacityValues[2] }}>.</Animated.Text>
        </Text>
      </View>
    </Modal>
  )
}
