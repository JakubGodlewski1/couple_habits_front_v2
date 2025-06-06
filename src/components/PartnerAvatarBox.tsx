import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import { Image, TouchableOpacity, View } from "react-native"
import avatarPlaceholder from "@/assets/icons/avatar_placeholder.png"
import Text from "@/components/Text"
import { useUploadPartnerAvatar } from "@/features/avatar/api/hooks/useUploadPartnerAvatar"
import { useTutorialRefContext } from "@/features/tutorial/contexts/tutorialRefContext"

export default function PartnerAvatarBox() {
  const user = useGetUser().user!
  const avatars = useGetAvatars().avatars!

  const { uploadPartnerAvatar, isPending } = useUploadPartnerAvatar()
  const { setTutorialRef } = useTutorialRefContext()

  return (
    <View className="w-full justify-center  items-center">
      <TouchableOpacity
        ref={(node) => setTutorialRef("partnerAvatar", node)}
        disabled={isPending}
        onPress={uploadPartnerAvatar}
        activeOpacity={0.8}
        className="border-main rounded-full border-1 p-1.5 z-20 bg-white"
      >
        {!avatars.partnerAvatarBase64 ? (
          <Image
            source={avatarPlaceholder}
            style={{ width: 120, height: 120, borderRadius: 99, zIndex: 50 }}
          />
        ) : (
          <Image
            source={{
              uri: `${avatars.partnerAvatarBase64}`,
            }}
            style={{ width: 120, height: 120, borderRadius: 99, zIndex: 50 }}
          />
        )}
      </TouchableOpacity>
      <View className="w-full  justify-center  p-4  -mt-5  rounded-main border-main  bg-white items-center">
        <Text className=" text-xl  font-main800">
          {user.partnerName || "..."}
        </Text>
      </View>
    </View>
  )
}
