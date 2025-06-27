import { Audio } from "expo-av"

export const playClickSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/pop.mp3"),
  )
  await sound.playAsync()

  // Automatically unload after playing
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync()
    }
  })
}
