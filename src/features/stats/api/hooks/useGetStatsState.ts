import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { queryKeys } from "@/config/queryKeys"

export const useGetStatsState = () => {
  const { getAxiosInstance } = useAxios()
  const { user } = useGetUser()

  const getStatsState = async (): Promise<StatsStateFromBackend> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/stats/state")
    return response.data
  }

  const { data, error, isError, isPending, refetch } =
    useQuery<StatsStateFromBackend>({
      queryFn: getStatsState,
      queryKey: queryKeys.statsState.get,
      enabled: user && user.hasPartner,
    })

  return { data, error, isError, isPending, refetch }
}
