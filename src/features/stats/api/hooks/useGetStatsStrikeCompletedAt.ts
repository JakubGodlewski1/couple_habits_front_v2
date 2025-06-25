import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { queryKeys } from "@/config/queryKeys"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useGetStatsStrikeCompletedAt = (
  { isDisabled }: { isDisabled?: boolean } = { isDisabled: false },
) => {
  const { user } = useGetUser()
  const { getAxiosInstance } = useAxios()

  const getStatsStrikeCompletedAt = async (): Promise<{
    isCompleted: boolean
  }> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/stats/strikeCompletion")
    return response.data
  }

  const enabled = !isDisabled && !!user?.hasPartner

  const { data, error, isError, isPending, isLoading } = useQuery<{
    isCompleted: boolean
  }>({
    enabled,
    queryFn: getStatsStrikeCompletedAt,
    queryKey: queryKeys.statsStrikeCompletion.get,
  })

  const fallBack = { isCompleted: false }
  const statsStrikeCompletedAt = data || fallBack

  return {
    isStrikeCompleted: statsStrikeCompletedAt.isCompleted,
    error,
    isError,
    isPending: enabled ? isPending : false,
    isLoading: enabled ? isLoading : false,
  }
}
