import { useEffect, useRef } from "react"
import { Animated, StyleSheet } from "react-native"

const getRandomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min

const PopUpText = ({ points }: { points: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  // Generate random values for this instance
  const randomTranslateY = getRandomValue(30, 100)
  const randomTranslateX = getRandomValue(-50, 50)
  const randomRotation = getRandomValue(690, 750) // Random rotation

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300, // Slower fade-in
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -randomTranslateY,
          duration: 300, // Slower movement
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300, // Rotation animation
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(150), // Wait before disappearing
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Derived animations
  const translateX = translateY.interpolate({
    inputRange: [-randomTranslateY, 0],
    outputRange: [-randomTranslateX, 0], // Move left randomly
  })

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${randomRotation}deg`], // Rotate randomly
  })

  return (
    <Animated.Text
      style={[
        styles.text,
        {
          opacity: fadeAnim,
          transform: [{ translateY }, { translateX }, { rotate }],
        },
      ]}
    >
      +{points}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    fontSize: 42,
    fontWeight: "bold",
    color: "#4CAF50",
    alignSelf: "center",
  },
})

export default PopUpText
