import { useAxios } from "@/api/hooks/useAxios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

export const useGetSubscriptionInfo = () => {
  const { data: featureFlags } = useGetFeatureFlags()

  const { getAxiosInstance } = useAxios()
  const getSubscriptionInfo = async (): Promise<SubscriptionInfo> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/subscriptions/pro-access")
    return response.data
  }

  const { data, error, isPending } = useQuery<SubscriptionInfo>({
    queryFn: getSubscriptionInfo,
    queryKey: queryKeys.subscription.get,
    staleTime: 1000 * 60 * 60, //1h
    gcTime: 1000 * 60 * 60 * 24, //24h,
  })

  //if paywall is disabled by feature flag, return pro access to for everyone
  const dataToReturn =
    featureFlags && !featureFlags.isPaywallEnabled
      ? { ...data, hasProAccess: true }
      : data

  return { subscriptionInfo: dataToReturn, error, isPending }
}
