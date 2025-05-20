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
import "react-native-get-random-values"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Alert } from "react-native"
import { useMutate } from "@/api/hooks/useMutate"
import { useCreateHabit } from "@/features/habits/api/hooks/useCreateHabit"

type Props = {
  initialData?: HabitFormType
  habitId?: number
  onSettled?: () => void
}

export const useHabitForm = ({ initialData, habitId, onSettled }: Props) => {
  const { hasPartner, partnerName } = useGetUser().user!

  const { createHabit, isPending } = useCreateHabit({ onSettled })

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
      label: "",
      frequency: { type: "repeat", value: "daily" },
    },
    resolver: zodResolver(habitFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const onChange = {
    label: (value: string) => {
      clearErrors(["label"])
      setValue("label", value)
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
      const frequency = getValues("frequency")
      const selectedDays = frequency.value as SpecificDaysValue

      const newDays =
        selectedDays.length > 1 && selectedDays.includes(selectedDay)
          ? selectedDays.filter((d) => d !== selectedDay)
          : selectedDays.includes(selectedDay)
            ? selectedDays
            : [...selectedDays, selectedDay]

      setValue("frequency", { type: "specificDays", value: newDays })
    },
  }

  const onSubmit = async (data: HabitFormType) => {
    if (!hasPartner) {
      return Alert.alert(
        `Connect with ${partnerName} first`,
        `You have to connect with ${partnerName} before creating your first habit.`,
      )
    }

    createHabit(data)
  }

  const [label, frequency] = watch(["label", "frequency"])

  return {
    isPending,
    values: {
      label,
      frequency,
    },
    handleSubmit: handleSubmit(onSubmit),
    errors,
    onChange,
  }
}
