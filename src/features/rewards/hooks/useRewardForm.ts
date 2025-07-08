import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { useCreateReward } from "@/features/rewards/api/hooks/useCreateReward"
import { useUpdateReward } from "@/features/rewards/api/hooks/useUpdateReward"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRewardValidation } from "@/features/rewards/validation/rewards.validation"

const floorToCustom10 = (n: number) => {
  const rem = n % 10
  return n - rem + (rem >= 5 ? 10 : 0)
}

type Props = {
  defaultValues?: {
    label: string
    imageUrl: string
    price: number
  }
  onCloseModal: () => void
  id?: number
}

export const useRewardForm = ({ onCloseModal, defaultValues, id }: Props) => {
  // states
  const { setIsHidden } = useHideTabbarContext()
  const { data } = useGetHabits()
  const { control, watch, setValue, handleSubmit } = useForm<RewardsForm>({
    defaultValues: defaultValues || { tab: "cheap" },
    resolver: zodResolver(createRewardValidation),
  })

  const { create, isPending: isCreating } = useCreateReward({
    onSettled: onCloseModal,
  })

  const { update, isPending: isUpdating } = useUpdateReward({
    onSettled: onCloseModal,
  })

  const onSubmit = (data: RewardsForm) => {
    if (id && defaultValues) {
      update({ data, id })
    }
    create(data)
  }

  // watch
  const [imageUrl, price, tab] = watch(["imageUrl", "price", "tab"])

  // cancel
  const onCancel = () => {
    onCloseModal()
    setIsHidden(false)
    router.navigate("/rewards")
  }

  // generate random points
  useEffect(() => {
    if (!data) return

    const habitsLength = data.user.length + data.partner.length
    const pointsPerCompletion = 10
    const random = Math.random() * 0.4 + 0.8

    const basePrices: Record<string, number> = {
      cheap: 7,
      expensive: 27,
      luxury: 90,
    }

    const base = basePrices[tab]
    if (!base) return

    const price = floorToCustom10(
      habitsLength * base * random * pointsPerCompletion,
    )

    setValue("price", price)
  }, [data, tab])

  return {
    isSubmitting: isCreating || isUpdating,
    handleSubmit: handleSubmit(onSubmit),
    control,
    imageUrl,
    price,
    setImageUrl: (value: string) => setValue("imageUrl", value),
    onCancel,
  }
}
