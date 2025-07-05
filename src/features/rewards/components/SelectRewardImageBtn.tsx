import { TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { vibrate } from "@/utils/vibrate"
import { useState } from "react"
import { PexelsGallery } from "@/features/rewards/components/PexelGallery"
import Button from "@/components/Button"
import Text from "@/components/Text"

type Props = {
  setUri: (uri: string) => void
  type?: "icon" | "button"
}

export default function SelectRewardImageBtn({ setUri, type = "icon" }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onPress = async () => {
    vibrate()
    setIsModalVisible(true)
  }

  if (type === "icon")
    return (
      <>
        <TouchableOpacity
          className="bg-primary h-[50px] w-[50px] items-center justify-center rounded-xl"
          onPress={onPress}
        >
          <Feather name="image" size={28} color="white" />
        </TouchableOpacity>
        <PexelsGallery
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelect={(uri) => setUri(uri)}
        />
      </>
    )

  return (
    <View className="gap-2">
      <Text>Please select the reward&apos;s image</Text>
      <Button
        iconPosition="right"
        size="sm"
        type="white"
        onPress={onPress}
        title="add the image"
      >
        <Feather name="image" size={24} color="primary" />
      </Button>
      <PexelsGallery
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelect={(uri) => setUri(uri)}
      />
    </View>
  )
}
