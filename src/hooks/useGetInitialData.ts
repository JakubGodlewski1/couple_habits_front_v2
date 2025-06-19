import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetStats } from "@/features/stats/api/hooks/useGetStats"
import { useGetAvatars } from "@/features/avatar/api/hooks/useGetAvatars"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useGetPartnerRequest } from "@/features/shared/partnerRequests/api/hooks/useGetPartnerRequest"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

export const useGetInitialData = () => {
  const userQuery = useGetUser()
  const statsQuery = useGetStats()
  const avatarsQuery = useGetAvatars()
  const subscriptionInfoQuery = useGetSubscriptionInfo()
  const getPartnerRequestQuery = useGetPartnerRequest()
  const featureFlagsQuery = useGetFeatureFlags()

  const isError =
    userQuery.isError ||
    statsQuery.isError ||
    avatarsQuery.isError ||
    subscriptionInfoQuery.isError ||
    getPartnerRequestQuery.isError ||
    featureFlagsQuery.isError

  const noData =
    !userQuery.user ||
    !statsQuery.stats ||
    !avatarsQuery.avatars ||
    !subscriptionInfoQuery.subscriptionInfo ||
    !getPartnerRequestQuery.data ||
    !featureFlagsQuery.data

  const isPending =
    userQuery.isPending ||
    statsQuery.isPending ||
    avatarsQuery.isPending ||
    subscriptionInfoQuery.isPending ||
    getPartnerRequestQuery.isPending ||
    featureFlagsQuery.isPending

  const errors = {
    user: userQuery.isError,
    stats: statsQuery.isError,
    avatars: avatarsQuery.isError,
    subscriptionInfo: subscriptionInfoQuery.isError,
    partnerRequest: getPartnerRequestQuery.isError,
    featureFlags: featureFlagsQuery.isError,
  }

  return {
    isPending,
    isError,
    noData,
    errors,
  }
}
