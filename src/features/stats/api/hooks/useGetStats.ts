import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { queryKeys } from "@/config/queryKeys"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useGetStats = (
  { isDisabled }: { isDisabled?: boolean } = { isDisabled: false },
) => {
  const { user } = useGetUser()
  const { getAxiosInstance } = useAxios()

  const getStats = async (): Promise<StatsFromBackend> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/stats")
    return response.data
  }

  const enabled = !isDisabled && !!user?.hasPartner

  const { data, error, isError, isPending, isLoading } =
    useQuery<StatsFromBackend>({
      enabled,
      queryFn: getStats,
      queryKey: queryKeys.stats.get,
    })

  const fallBack = { points: 0, habits: 0 }
  const stats = data || fallBack

  return {
    stats,
    error,
    isError,
    isPending: enabled ? isPending : false,
    isLoading: enabled ? isLoading : false,
  }
}
