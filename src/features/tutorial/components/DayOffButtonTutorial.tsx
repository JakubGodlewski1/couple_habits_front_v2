import Button from "../../../components/Button"
import Text from "../../../components/Text"
import { Image, TouchableOpacity } from "react-native"
import clickIcon from "../../../assets/icons/click-finger.png"

export default function DayOffButtonTutorial() {
  return (
    <TouchableOpacity className="relative">
      <Image
        className="w-20 h-20 absolute left-[40%] z-10 -bottom-7"
        source={clickIcon}
      />
      <Button
        type="secondary"
        classNames={{ wrapper: "flex-row justify-between" }}
        onPress={() => {}}
        title="Take a day off"
        iconPosition="right"
      >
        <Text className="text-white">
          ⭐️ <Text className="font-main800">900</Text> points
        </Text>
      </Button>
    </TouchableOpacity>
  )
}
