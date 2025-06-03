import { PropsWithChildren, useEffect, useRef } from "react"
import { Animated, StyleSheet } from "react-native"

export default function TutorialBackgroundWrapper({
  children,
}: PropsWithChildren) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View style={[styles.wrapper, { opacity }]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: "100%",
    width: "100%",
  },
})
