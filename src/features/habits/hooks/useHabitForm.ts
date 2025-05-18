import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  FrequencyType,
  HabitFormType,
  RepeatValue,
  SpecificDaysValue,
} from "@/features/habits/types/habitForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { habitFormSchema } from "@/features/habits/schemas/habitFormSchema"
import { DayOfTheWeek } from "@/types/daysOfWeek"
import useSendRequestToPartner from "@/features/shared/partnerRequests/api/hooks/useSendRequestToPartner"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { useManageHabitLimit } from "@/features/subscriptions/hooks/checks/useManageHabitLimit"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Alert } from "react-native"

type Props = {
  initialData?: HabitFormType
  habitId?: number
  onSettled?: () => void
}

export const useHabitForm = ({ initialData, habitId, onSettled }: Props) => {
  const [areDifferentHabits, setAreDifferentHabits] = useState(
    initialData?.partnerLabel &&
      initialData.partnerLabel !== initialData.userLabel,
  )
  const { sendRequestToPartner } = useSendRequestToPartner()
  const { showPaywallIfNeeded, isProLoading } = useManageHabitLimit()
  const { hasPartner, partnerName } = useGetUser().user!

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
    clearErrors,
  } = useForm<HabitFormType>({
    defaultValues: initialData || {
      userLabel: "",
      partnerLabel: "",
      frequency: { type: "repeat", value: "daily" },
    },
    resolver: zodResolver(habitFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: HabitFormType) => {
    if (!hasPartner) {
      return Alert.alert(
        `Connect with ${partnerName} first`,
        `You have to connect with ${partnerName} before creating your first habit.`,
      )
    }

    //validate pro account when a user wants to add a new habit
    if (!habitId) {
      const habitLimitExceeded = await showPaywallIfNeeded()
      if (habitLimitExceeded) return
    }

    const dataWithRotatedLabels = {
      ...data,
      userLabel: data.partnerLabel,
      partnerLabel: data.userLabel,
    }

    const detailsOnCreate = {
      type: "create",
      ...dataWithRotatedLabels,
    }

    const detailsOnUpdate = {
      type: "update",
      before: {
        userLabel: initialData?.partnerLabel,
        partnerLabel: initialData?.userLabel,
        frequency: initialData?.frequency,
      },
      after: dataWithRotatedLabels,
    }

    const dataForRequest = habitId
      ? {
          body: { data: dataWithRotatedLabels, id: habitId },
          details: detailsOnUpdate,
        }
      : {
          body: { ...dataWithRotatedLabels, id: uuidv4() },
          details: detailsOnCreate,
        }

    sendRequestToPartner({
      option: habitId ? "updateHabit" : "createHabit",
      data: JSON.stringify(dataForRequest),
    })
    if (onSettled) onSettled()
  }

  const toggleAreDifferentHabits = () => {
    //if user's habit and partner's habit are the same, set partner's habit to user's habit,
    // otherwise set partner's habit to empty string

    if (areDifferentHabits) {
      const userLabel = getValues("userLabel")
      setValue("partnerLabel", userLabel)
    } else {
      clearErrors(["partnerLabel"])
      setValue("partnerLabel", "")
    }

    setAreDifferentHabits((p) => !p)
  }

  const [userLabel, partnerLabel, frequency] = watch([
    "userLabel",
    "partnerLabel",
    "frequency",
  ])

  const onChange = {
    userLabel: (value: string) => {
      clearErrors(["userLabel"])
      setValue("userLabel", value)
      if (!areDifferentHabits) {
        setValue("partnerLabel", value)
      }
    },
    partnerLabel: (value: string) => {
      clearErrors(["partnerLabel"])
      setValue("partnerLabel", value)
    },
    tabs: async (key: FrequencyType) => {
      setValue(
        "frequency",
        key === "repeat"
          ? { type: "repeat", value: "daily" }
          : { type: "specificDays", value: ["monday"] },
      )
      await trigger("frequency.type")
    },
    dropdown: (value: RepeatValue) => setValue("frequency.value", value),
    specificDaysValue: (selectedDay: DayOfTheWeek) => {
      const newDays = (() => {
        const selectedDays = frequency.value as SpecificDaysValue

        if (selectedDays.length > 1 && selectedDays.includes(selectedDay)) {
          return selectedDays.filter((d: DayOfTheWeek) => d !== selectedDay)
        } else if (!selectedDays.includes(selectedDay)) {
          return [...selectedDays, selectedDay]
        } else {
          return selectedDays
        }
      })()

      setValue("frequency", { type: "specificDays", value: newDays })
    },
  }

  return {
    values: {
      userLabel,
      partnerLabel,
      frequency,
    },
    toggleAreDifferentHabits,
    areDifferentHabits,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    onChange,
    isProLoading,
  }
}
