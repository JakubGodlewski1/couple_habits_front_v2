import { useAxios } from "@/api/hooks/useAxios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useGetHabits = () => {
  const { getAxiosInstance } = useAxios()
  const { user } = useGetUser()

  const getHabits = async () => {
    const axios = await getAxiosInstance()
    const res = await axios.get("/habits")
    return await res.data
  }

  const { data, isLoading, isError, isPending } = useQuery<HabitsFromBackend>({
    queryKey: queryKeys.habits.get,
    queryFn: getHabits,
    enabled: user?.hasPartner,
  })

  const fallback = {
    user: [],
    partner: [],
  }

  const dataToReturn = user?.hasPartner ? data : fallback

  return { data: dataToReturn, isError, isLoading, isPending }
}
