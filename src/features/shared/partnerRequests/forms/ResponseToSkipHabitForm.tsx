import { Alert, Image, View } from "react-native"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import Button from "@/components/Button"
import chill from "@/assets/illustrations/chill.png"
import Text from "@/components/Text"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useMutate } from "@/api/hooks/useMutate"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useSkipHabit } from "@/features/habits/api/hooks/useSkipHabit"
import { useSendResponseToPartner } from "@/features/shared/partnerRequests/api/hooks/useSendResponseToPartner"
import { useEffect, useRef } from "react"

type Props = {
  partnerRequestData: SkipHabitOption
}

export default function ResponseToSkipHabitForm({ partnerRequestData }: Props) {
  const { data } = partnerRequestData

  const { sendResponse } = useSendResponseToPartner()
  const { data: habits } = useGetHabits()
  const user = useGetUser().user!
  const { skipHabit, isPending: isCompleting } = useSkipHabit()
  const queryClient = useQueryClient()

  const { deleteAsync, isPending } = useMutate({
    endpoint: "/partner-requests",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.partnerRequests.get,
      })
      queryClient.setQueryData(queryKeys.partnerRequests.get, () => ({
        option: null,
      }))
    },
  })

  const alreadyHandledMissingHabit = useRef(false)

  const habit = habits?.partner.find((h) => h.id === data.id)

  useEffect(() => {
    if (habits && !habit && !alreadyHandledMissingHabit.current) {
      deleteAsync(undefined)
    }
  }, [habits, habit, deleteAsync])

  // ✅ early return after hooks are called
  if (!habits || !habit) return null

  const onAccept = async () => {
    await deleteAsync(undefined)
    skipHabit({ id: data.id })
    sendResponse(true)
    Alert.alert(
      `Great, your decision has been sent to ${user?.partnerName || "your partner"}!`,
    )
  }

  const onCancel = async () => {
    await deleteAsync(undefined)
    sendResponse(false)
    Alert.alert(
      `Great, your decision has been sent to ${user?.partnerName || "your partner"}!`,
    )
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
        - Habit&apos;s label:
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
          classNames={{ wrapper: "flex-grow" }}
          onPress={onCancel}
          title="No, I don't agree"
        />
        <Button
          disabled={isCompleting || isPending}
          classNames={{ wrapper: "flex-grow" }}
          onPress={onAccept}
          title="Yea, sure!"
        />
      </View>
    </View>
  )
}
