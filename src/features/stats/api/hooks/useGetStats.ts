import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { queryKeys } from "@/config/queryKeys"

export const useGetStats = (
  { isDisabled }: { isDisabled?: boolean } = { isDisabled: false },
) => {
  const { getAxiosInstance } = useAxios()

  const getStats = async (): Promise<StatsFromBackend> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/stats")
    return response.data
  }

  const { data, error, isError, isPending, isLoading } =
    useQuery<StatsFromBackend>({
      enabled: !isDisabled,
      queryFn: getStats,
      queryKey: queryKeys.stats.get,
    })

  return { stats: data, error, isError, isPending, isLoading }
}
