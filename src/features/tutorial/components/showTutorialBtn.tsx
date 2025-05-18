import Button from "@/components/Button"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"

export default function ShowTutorialBtn() {
  return (
    <Button
      classNames={{ wrapper: `justify-between` }}
      iconPosition="right"
      type="white"
      onPress={() => router.push("/how-to-play")}
      title="Tutorial"
    >
      <Feather name="book" size={24} color="black" />
    </Button>
  )
}
