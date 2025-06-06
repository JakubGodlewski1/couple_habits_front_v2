import { TouchableOpacity, View } from "react-native"
import Text from "@/components/Text"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import Button from "@/components/Button"
import { AntDesign } from "@expo/vector-icons"

type Props = {
  onClose: () => void
  onPress: () => void
  title: string
  text?: string
  btnLabel: string
  showCloseButton?: boolean
}

export default function TutorialCard({
  btnLabel,
  title,
  text,
  onClose,
  onPress,
  showCloseButton,
}: Props) {
  const user = useGetUser().user!

  return (
    <View className="bg-black/60 p-5 rounded-xl w-[90vw] left-1/2 -translate-x-1/2 gap-6">
      {showCloseButton && (
        <TouchableOpacity
          className="ml-auto absolute right-0 top-0 p-3  z-[100]"
          onPress={onClose}
        >
          <AntDesign name="close" size={20} color="white" />
        </TouchableOpacity>
      )}
      <Text
        style={{ marginBottom: 0 }}
        className="text-white text-center"
        type="h1"
      >
        {title.replace("{partner}", user?.partnerName || "partner")}
      </Text>
      {text && (
        <Text className="text-white text-center font-semibold">
          {text.replace("{partner}", user?.partnerName || "partner")}
        </Text>
      )}
      <Button onPress={onPress} title={btnLabel} />
    </View>
  )
}
