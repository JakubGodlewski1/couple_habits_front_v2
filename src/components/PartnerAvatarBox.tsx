import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import IsLoading from "@/components/IsLoading"
import IsError from "./IsError"
import { View, Image } from "react-native"
import avatarPlaceholder from "@/assets/icons/avatar_placeholder.png"
import Text from "@/components/Text"

export default function PartnerAvatarBox() {
  const { user, isPending: isUserPending, error: userError } = useGetUser()
  const {
    isPending: isAvatarPending,
    isError: isAvatarError,
    avatars,
  } = useGetAvatars()

  if (isUserPending || isAvatarPending) return <IsLoading />
  if (userError) return <IsError />

  const isIcon =
    isAvatarPending || isAvatarError || !avatars?.partnerAvatarBase64

  return (
    <View className="w-full justify-center  items-center">
      <View className="border-main rounded-full border-1 p-1.5 z-20 bg-white">
        {isIcon ? (
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
      </View>
      <View className="w-full  justify-center  p-4  -mt-5  rounded-main border-main  bg-white items-center">
        <Text className=" text-xl  font-main800">
          {user!.partnerName || "Partner"}
        </Text>
      </View>
    </View>
  )
}
