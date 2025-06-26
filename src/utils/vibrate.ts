import * as Haptics from "expo-haptics"

export const vibrate = (
  type: "Light" | "Soft" | "Rigid" | "Medium" | "Heavy" = "Light",
) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle[type])
}
