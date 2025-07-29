import { useConfetti } from "@/contexts/ConfettiContext"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { useEffect } from "react"
import { habitFilters } from "@/features/habits/filters/filters"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CONFETTI_KEY = "confettiFiredDate"

export const useShowConfettiOnHabitsCompleted = () => {
  const { startConfetti } = useConfetti()
  const { data } = useGetHabits()

  const userUncompleted = data?.user
    .filter(habitFilters.isIncompleted)
    .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)
  const partnerUncompleted = data?.partner
    .filter(habitFilters.isIncompleted)
    .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)

  useEffect(() => {
    const checkAndFireConfetti = async () => {
      if (
        userUncompleted &&
        partnerUncompleted &&
        userUncompleted.length === 0 &&
        partnerUncompleted.length === 0
      ) {
        const today = new Date().toISOString().split("T")[0]
        const firedDate = await AsyncStorage.getItem(CONFETTI_KEY)

        if (firedDate !== today) {
          await AsyncStorage.setItem(CONFETTI_KEY, today)
          startConfetti({ message: "All habits completed ❤️" })
        }
      }

      if (
        userUncompleted &&
        partnerUncompleted &&
        (userUncompleted.length !== 0 || partnerUncompleted.length !== 0)
      )
        await AsyncStorage.removeItem(CONFETTI_KEY)
    }

    checkAndFireConfetti()
  }, [userUncompleted?.length, partnerUncompleted?.length])
}
