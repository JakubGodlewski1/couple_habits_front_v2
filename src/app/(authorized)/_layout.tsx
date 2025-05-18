import { useAuth } from "@clerk/clerk-expo"
import IsLoading from "@/components/IsLoading"
import { Redirect, Stack } from "expo-router"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useRegisterPurchaseObj } from "@/features/subscriptions/hooks/useRegisterPurchaseObj"
import { useClearAllCacheData } from "@/hooks/useClearAllData"
import { useGetSubscriptionInfo } from "@/features/subscriptions/hooks/useGetSubscriptionInfo"
import { useGetFeatureFlags } from "@/features/featureFlags/api/hooks/useGetFeatureFlags"

//1 redirect if user is not signed in
const AuthorizedLayout = () => {
  const { isSignedIn } = useAuth()
  if (!isSignedIn) return <Redirect href="/(unauthorized)/sign-in" />

  return <ResetCache />
}

//2 reset all cache
const ResetCache = () => {
  const { isResetting } = useClearAllCacheData()
  if (isResetting) return <IsLoading />

  return <GetInitialData />
}

//3 fetch all initial data that is needed
const GetInitialData = () => {
  const { isPending: isUserPending, error: userError, user } = useGetUser()
  const { isPending: isSubscriptionPending, error: subscriptionError } =
    useGetSubscriptionInfo()
  const { isPending: isFeatureFlagsPending, error: featureFlagsError } =
    useGetFeatureFlags()

  const isPending =
    isUserPending || isSubscriptionPending || isFeatureFlagsPending
  const error = userError || subscriptionError || featureFlagsError

  if (isPending) return <IsLoading />
  if (error)
    throw new Error("Error in authorized layout while fetching initial data")

  return <RegisterPaymentsAndReturnStack user={user!} />
}

//register payments and show the stack
const RegisterPaymentsAndReturnStack = ({
  user,
}: {
  user: UserFromBackend
}) => {
  useRegisterPurchaseObj({ user })

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(main)"
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack>
  )
}

export default AuthorizedLayout
