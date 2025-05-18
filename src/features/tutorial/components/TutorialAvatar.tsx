import { Image } from "react-native"
import woman from "@/assets/images/woman.jpg"
import man from "@/assets/images/man.jpg"

const TutorialAvatar = ({ type }: { type: "user" | "partner" }) => {
  return (
    <Image
      className="h-20 w-20 rounded-full"
      source={type === "partner" ? woman : man}
      resizeMode="cover"
    />
  )
}

export default TutorialAvatar
