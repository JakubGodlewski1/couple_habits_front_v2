import Button from "@/components/Button"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useBuyPro } from "@/features/subscriptions/hooks/useBuyPro"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"

type Props = {
  isPending: boolean
  handleSubmit: () => void
  habitId?: number
}

const CreateHabitBtnSecured = ({ habitId, isPending, handleSubmit }: Props) => {
  const { isPending: areHabitsPending, data: habits } = useGetHabits()

  const { hasProAccess } = useGetSubscriptionInfo().subscriptionInfo!
  const { buyPro, isLoading: isLoadingProAccount } = useBuyPro({
    paywallIdentifier: "freemium1/habit-limit-exceeded",
  })

  const isLoading = isLoadingProAccount || isPending || areHabitsPending

  const onSubmit = () => {
    if (hasProAccess || habits!.user.length < 2) handleSubmit()
    else buyPro()
  }

  return (
    <Button
      disabled={isLoading}
      classNames={{
        wrapper: "flex-1",
      }}
      onPress={onSubmit}
      title={habitId ? "Update" : "Create"}
    />
  )
}

export default CreateHabitBtnSecured
