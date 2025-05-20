import { useAxios } from "@/api/hooks/useAxios"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"

export const useGetHabits = () => {
  const { getAxiosInstance } = useAxios()

  const getHabits = async () => {
    const axios = await getAxiosInstance()
    const res = await axios.get("/habits")
    return await res.data
  }

  const { data, isLoading, isError } = useQuery<HabitsFromBackend>({
    queryKey: queryKeys.habits.get,
    queryFn: getHabits,
  })

  return { data, isError, isLoading }
}
