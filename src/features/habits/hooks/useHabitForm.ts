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
import { useCreateHabit } from "@/features/habits/api/hooks/useCreateHabit"
import { useUpdateHabit } from "@/features/habits/api/hooks/useUpdateHabit"
import { useEffect, useState } from "react"
import { useNotifications } from "@/features/shared/notifications/hooks/useNotifications"
import { DAYS_OF_THE_WEEK_TO_INT } from "@/consts/consts"

type Props = {
  initialData?: HabitFormType
  habitId?: number
  onSettled?: () => void
}

export const useHabitForm = ({ initialData, habitId, onSettled }: Props) => {
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
      isShared: false,
      targetCount: 1,
      label: "",
      frequency: { type: "repeat", value: "daily" },
      goalType: "atLeast",
    },
    resolver: zodResolver(habitFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const [label, frequency, isShared] = watch(["label", "frequency", "isShared"])

  //reminders
  const { cancel, schedule, scheduledReminders } = useNotifications()
  const [time, setTime] = useState(new Date(Date.now()))
  const [isReminderOn, setIsReminderOn] = useState(false)

  useEffect(() => {
    if (!habitId) return

    const reminder = scheduledReminders.find((r) => r.id === habitId.toString())
    if (!reminder) return

    setIsReminderOn(true)
    const now = new Date()
    setTime(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        reminder.hour,
        reminder.minute,
        0,
        0,
      ),
    )
  }, [scheduledReminders.length, habitId])

  const setupReminder = async (id: number) => {
    const freq =
      frequency.type === "repeat"
        ? frequency.value
        : frequency.value.map((d) => DAYS_OF_THE_WEEK_TO_INT[d])

    await schedule({
      id,
      title: `Couple habits - ${label}`,
      body: `Your habit "${label}" is waiting for You! Have you done it yet?`,
      frequency: freq,
      hour: time.getHours(),
      minute: time.getMinutes(),
    })
  }

  const onSuccessCreate = ({ id }: { id: number }) => {
    if (isReminderOn) setupReminder(id)
  }

  const onSuccessUpdate = async () => {
    await cancel(habitId!)
    if (isReminderOn) setupReminder(habitId!)
  }

  const { createHabit, isPending: isCreating } = useCreateHabit({
    onSettled,
    onSuccess: onSuccessCreate,
  })
  const { updateHabit, isPending: isUpdating } = useUpdateHabit({
    onSettled,
    onSuccess: onSuccessUpdate,
  })

  const user = useGetUser().user!

  const isPending = isCreating || isUpdating

  const onChange = {
    isShared: (value: boolean) => setValue("isShared", value),
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
    if (!user) return

    if (!user.hasPartner) {
      return Alert.alert(
        `Connect with ${user.partnerName} first`,
        `You have to connect with ${user.partnerName} before creating your first habit.`,
      )
    }

    if (!habitId) {
      createHabit(data)
    } else {
      updateHabit({ data, id: habitId! })
    }
  }

  return {
    reminders: {
      time,
      isReminderOn,
      setTime,
      setIsReminderOn,
    },
    isPending,
    values: {
      label,
      frequency,
      isShared,
    },
    handleSubmit: handleSubmit(onSubmit),
    errors,
    onChange,
  }
}
