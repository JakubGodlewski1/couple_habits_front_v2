import { Image, View } from "react-native"
import Button from "@/components/Button"
import accept from "@/assets/illustrations/accept.png"
import cancel from "@/assets/illustrations/cancel.png"
import Text from "@/components/Text"
import { useMutate } from "@/api/hooks/useMutate"
import { queryKeys } from "@/config/queryKeys"
import { useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

type Props = {
  partnerRequestData: ResponseOption
}

export default function ResponseToAnyRequestForm({
  partnerRequestData,
}: Props) {
  const queryClient = useQueryClient()
  const { user } = useGetUser()

  //delete request
  const { deleteItem, isPending } = useMutate({
    endpoint: "/partner-requests",
    onSuccess: () => {
      //revalidate requests to hide the modal. Also add optimistic update to hide the modal faster
      queryClient.invalidateQueries({
        queryKey: queryKeys.partnerRequests.get,
      })
      queryClient.setQueryData(queryKeys.partnerRequests.get, () => ({
        option: null,
      }))
    },
  })

  return (
    <View className="p-2 items-center grow ">
      <Image
        resizeMode="contain"
        className="w-screen h-[30vh]"
        source={partnerRequestData.data.accepted ? accept : cancel}
      />
      <Text className="text-center mx-4 mb-4 mt-20" type="h2">
        {(user?.partnerName || "Your partner") +
          (partnerRequestData.data.accepted ? " agreed" : " did not agree") +
          " to skip the habit"}
      </Text>
      <View className="flex-row w-full gap-2 mt-auto">
        <Button
          disabled={isPending}
          classNames={{
            wrapper: "flex-grow",
          }}
          onPress={() => deleteItem(undefined)}
          title="Ok"
        />
      </View>
    </View>
  )
}
