import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useGetRewards = () => {
  const { getAxiosInstance } = useAxios()
  const user = useGetUser().user

  const getRewardsFn = async () => {
    const axios = await getAxiosInstance()
    const res = await axios.get("/rewards")
    return await res.data
  }

  const { isPending, data, error } = useQuery<RewardsFromBackend>({
    queryKey: queryKeys.rewards.get,
    queryFn: getRewardsFn,
    enabled: !!(user && user.hasPartner),
  })

  return { isPending, data, error }
}
