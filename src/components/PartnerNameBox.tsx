import { View, Text } from "react-native"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

export default function PartnerNameBox() {
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  return (
    <View className="w-full flex-row justify-center  p-4  rounded-main border-main shadow-sm bg-white">
      <Text className=" text-xl  font-main800">
        {user!.partnerName || "Partner"}
      </Text>
    </View>
  )
}
