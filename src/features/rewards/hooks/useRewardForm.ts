import { useForm } from "react-hook-form"
import { useEffect, useRef } from "react"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { router } from "expo-router"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { useCreateReward } from "@/features/rewards/api/hooks/useCreateReward"
import { useUpdateReward } from "@/features/rewards/api/hooks/useUpdateReward"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRewardValidation } from "@/features/rewards/validation/rewards.validation"
import { useDeleteReward } from "@/features/rewards/api/hooks/useDeleteRewaard"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Alert } from "react-native"

const floorToCustom10 = (n: number) => {
  const rem = n % 10
  return n - rem + (rem >= 5 ? 10 : 0)
}

type Props = {
  defaultValues?: {
    label: string
    imageUrl: string
    price: number
    tab: RewardsPriceTabsKey
  }
  onCloseModal: () => void
  id?: number
}

export const useRewardForm = ({ onCloseModal, defaultValues, id }: Props) => {
  const { setIsHidden } = useHideTabbarContext()
  const { data } = useGetHabits()
  const user = useGetUser().user

  const { control, watch, setValue, handleSubmit } = useForm<RewardsForm>({
    defaultValues: defaultValues || { tab: "cheap" },
    resolver: zodResolver(createRewardValidation),
  })

  const { isPending: isDeleting, deleteRewardWithConfirmation } =
    useDeleteReward({ onSettled: onCloseModal })

  const { create, isPending: isCreating } = useCreateReward({
    onSettled: onCloseModal,
  })

  const { update, isPending: isUpdating } = useUpdateReward({
    onSettled: onCloseModal,
  })

  const [imageUrl, price, tab] = watch(["imageUrl", "price", "tab"])

  const onSubmit = (data: RewardsForm) => {
    //validate that user is connected with partner
    if (!user || !user.hasPartner) {
      return Alert.alert(
        `You are not connected with ${user?.partnerName || "your partner"}`,
        "Please connect first",
      )
    }

    if (id && defaultValues) {
      update({ data, id })
    } else {
      create(data)
    }
  }

  const onCancel = () => {
    onCloseModal()
    setIsHidden(false)
    router.navigate("/rewards")
  }

  const hasRunInitially = useRef(false)

  // Cache for prices per tab
  const cachedPricesRef = useRef<Partial<Record<RewardsPriceTabsKey, number>>>(
    {},
  )

  // Pre-fill cache if defaultValues exists
  if (
    defaultValues?.price !== undefined &&
    cachedPricesRef.current[defaultValues.tab] === undefined
  ) {
    cachedPricesRef.current[defaultValues.tab] = defaultValues.price
  }

  useEffect(() => {
    if (!data) return

    // Skip first run if default price is set
    if (!hasRunInitially.current && defaultValues?.price !== undefined) {
      hasRunInitially.current = true
      return
    }

    // Use cached price if available
    const cachedPrice = cachedPricesRef.current[tab]
    if (cachedPrice !== undefined) {
      setValue("price", cachedPrice)
      return
    }

    const habitsLength = data.user.length + data.partner.length
    const pointsPerCompletion = 10
    const random = Math.random() * 0.4 + 0.8

    const basePrices: Record<RewardsPriceTabsKey, number> = {
      cheap: 7,
      expensive: 27,
      luxury: 90,
    }

    const base = basePrices[tab]
    if (!base) return

    const newPrice = floorToCustom10(
      habitsLength * base * random * pointsPerCompletion,
    )

    cachedPricesRef.current[tab] = newPrice
    setValue("price", newPrice)

    hasRunInitially.current = true
  }, [data, tab])

  return {
    isSubmitting: isCreating || isUpdating || isDeleting,
    handleSubmit: handleSubmit(onSubmit),
    isImageMissing: !imageUrl,
    deleteRewardWithConfirmation,
    control,
    imageUrl,
    price,
    setImageUrl: (value: string) => setValue("imageUrl", value),
    onCancel,
  }
}
