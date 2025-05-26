import { Alert, Image, View } from "react-native"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"
import Button from "@/components/Button"
import chill from "@/assets/illustrations/chill.png"
import Text from "@/components/Text"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useMutate } from "@/api/hooks/useMutate"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useSkipHabit } from "@/features/habits/api/hooks/useSkipHabit"
import { useSendResponseToPartner } from "@/features/shared/partnerRequests/api/hooks/useSendResponseToPartner"

type Props = {
  partnerRequestData: SkipHabitOption
}

export default function ResponseToSkipHabitForm({ partnerRequestData }: Props) {
  const { data } = partnerRequestData
  const { sendResponse } = useSendResponseToPartner()

  const { isLoading, data: habits, isError } = useGetHabits()
  const { user } = useGetUser()
  const { skipHabit, isPending: isCompleting } = useSkipHabit()
  const queryClient = useQueryClient()

  //delete request
  const { deleteAsync, isPending } = useMutate({
    endpoint: "/partner-requests",
    onSuccess: () => {
      //revalidate requests to hide the modal. Also add optimistic update to hide the modal faster
      queryClient.invalidateQueries({
        queryKey: [queryKeys.partnerRequests.get],
      })
      queryClient.setQueryData([queryKeys.partnerRequests.get], () => ({
        option: null,
      }))
    },
  })

  const onAccept = async () => {
    //delete the request
    // @ts-ignore
    await deleteAsync()

    //skip the habit
    skipHabit({ id: data.id })

    //send request to partner with info that the request has been accepted
    sendResponse(true)

    //display info about the choice
    Alert.alert(
      `Great, your decision has been sent to ${user?.partnerName || "your partner"}!`,
    )
  }

  const onCancel = async () => {
    //delete the request
    // @ts-ignore
    await deleteAsync()

    //send request to partner with info that the request has been cancelled
    sendResponse(false)

    //display info about the choice
    Alert.alert(
      `Great, your decision has been sent to ${user?.partnerName || "your partner"}!`,
    )
  }

  if (isLoading) return <IsLoading />
  if (isError) return <IsError />

  //find the habit partner wants to skip
  const habit = habits!.partner.find((h) => h.id === data.id)

  if (!habit) {
    Alert.alert("We could not find the habit")
    // @ts-ignore
    //delete the request if habit does not exist
    deleteAsync()
    return null
  }

  return (
    <View className="p-2 items-center grow">
      <Image
        resizeMode="contain"
        className="w-screen h-[30vh]"
        source={chill}
      />
      <Text className="text-center mx-4 mb-4" type="h2">
        Your partner wants to skip a habit
      </Text>
      <Text className="mt-4 mb-2 self-start" type="h3">
        Details:
      </Text>
      <Text className="self-start">
        - Habit's label:
        <Text className="font-semibold"> {habit.label}</Text>
      </Text>
      {user?.habitSkipPrice && (
        <Text className="self-start">
          - It will cost You:
          <Text className="font-semibold"> {user.habitSkipPrice} points</Text>
        </Text>
      )}

      <View className="flex-row w-full gap-2 mt-auto mb-20">
        <Button
          disabled={isCompleting || isPending}
          type="subtle"
          classNames={{
            wrapper: "flex-grow",
          }}
          onPress={onCancel}
          title="No, I don't agree"
        />
        <Button
          disabled={isCompleting || isPending}
          classNames={{
            wrapper: "flex-grow",
          }}
          onPress={onAccept}
          title="Yea, sure!"
        />
      </View>
    </View>
  )
}
