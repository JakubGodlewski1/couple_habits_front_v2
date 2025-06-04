import { PropsWithChildren, useEffect, useRef } from "react"
import { Animated, Platform, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TutorialBackgroundWrapper({
  children,
}: PropsWithChildren) {
  const opacity = useRef(new Animated.Value(0)).current

  const { top: topInset } = useSafeAreaInsets()

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity,
          paddingTop: Platform.OS === "android" ? topInset * 2 : topInset,
        },
      ]}
    >
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
