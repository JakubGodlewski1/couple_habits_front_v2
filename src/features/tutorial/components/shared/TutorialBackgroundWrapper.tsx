import { View } from "react-native"
import { PropsWithChildren } from "react"

export default function TutorialBackgroundWrapper({
  children,
}: PropsWithChildren) {
  return (
    <View className="h-full w-full bg-black/60 absolute z-10">{children}</View>
  )
}
