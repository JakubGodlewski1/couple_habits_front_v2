import { useAxios } from "@/api/hooks/useAxios"
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

  const { data, isLoading, isError, isPending } = useQuery<HabitsFromBackend>({
    queryKey: queryKeys.habits.get,
    queryFn: getHabits,
  })

  return { data, isError, isLoading, isPending }
}
