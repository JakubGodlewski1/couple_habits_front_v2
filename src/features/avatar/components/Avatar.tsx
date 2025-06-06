import { Image, View } from "react-native"
import Text from "../../../components/Text"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

type Props = { type: "user" | "partner" }

export default function Avatar({ type }: Props) {
  const avatars = useGetAvatars().avatars!
  const user = useGetUser().user!

  const { partnerAvatarBase64, userAvatarBase64 } = avatars
  const avatar = type === "user" ? userAvatarBase64 : partnerAvatarBase64

  return avatar ? (
    <WithImage uri={avatar} />
  ) : (
    <WithText text={type === "user" ? "You" : user!.partnerName!} />
  )
}

const WithImage = ({ uri }: { uri: string }) => {
  return (
    <Image
      className="h-20 w-20 rounded-full"
      source={{ uri }}
      resizeMode="cover"
    />
  )
}

const WithText = ({ text }: { text: string }) => {
  return (
    <View className="h-20 w-20 rounded-full bg-subtle items-center justify-center">
      <Text className="text-center" type={text.length > 10 ? "sm" : "span"}>
        {text}
      </Text>
    </View>
  )
}
