import Animated from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import { Image } from "react-native"

type Props = {
  isFocused: boolean
  animatedIconStyle: any
}

export default function PartnerTabbarAvatar({
  animatedIconStyle,
  isFocused,
}: Props) {
  const avatars = useGetAvatars().avatars!

  const isIcon = !avatars.partnerAvatarBase64

  return (
    <Animated.View className={isIcon ? "mb-2" : ""} style={animatedIconStyle}>
      {isIcon ? (
        <MaterialCommunityIcons
          color={isFocused ? "white" : "black"}
          name="heart-outline"
          size={28}
        />
      ) : (
        <Image
          source={{
            uri: `${avatars.partnerAvatarBase64}`,
          }}
          style={{ width: 32, height: 32, borderRadius: 14 }}
        />
      )}
    </Animated.View>
  )
}
