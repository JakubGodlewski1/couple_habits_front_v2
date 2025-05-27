import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import IsLoading from "@/components/IsLoading"
import IsError from "./IsError"
import { View, Image } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
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
      {isIcon ? (
        <MaterialCommunityIcons
          color={"black"} // or define `isFocused` logic if needed
          name="heart-outline"
          size={100}
        />
      ) : (
        <Image
          source={{
            uri: `${avatars.partnerAvatarBase64}`,
          }}
          style={{ width: 100, height: 100, borderRadius: 99, zIndex: 50 }}
        />
      )}
      <View className="w-full  justify-center  p-4  -mt-3  rounded-main border-main  bg-white items-center">
        <Text className=" text-xl  font-main800">
          {user!.partnerName || "Partner"}
        </Text>
      </View>
    </View>
  )
}
