import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useAxios } from "@/api/hooks/useAxios"

export const useGetFeatureFlags = () => {
  const { getAxiosInstance } = useAxios()

  const getFeatureFlags = async () => {
    const axios = await getAxiosInstance()
    const { data } = await axios.get("/feature-flags")
    return data
  }

  const { data, isPending, error } = useQuery<FeatureFlags>({
    queryFn: getFeatureFlags,
    queryKey: queryKeys.featureFlags.get,
  })

  return { data, isPending, error }
}
