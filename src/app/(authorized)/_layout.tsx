import { useAuth } from "@clerk/clerk-expo"
import IsLoading from "@/components/IsLoading"
import { Redirect, Stack } from "expo-router"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useRegisterPurchaseObj } from "@/features/subscriptions/hooks/useRegisterPurchaseObj"
import { useGetInitialData } from "@/hooks/useGetInitialData"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import useRefetchOnAppStateChange from "@/hooks/useRefetchOnAppStateChange"
import { useGetStatsState } from "@/features/stats/api/hooks/useGetStatsState"

//1 redirect if user is not signed in
const AuthorizedLayout = () => {
  const { isSignedIn } = useAuth()
  if (!isSignedIn) return <Redirect href="/(unauthorized)/sign-in" />
  return <GetInitialData />
}

//2. fetch all initial data that is needed
const GetInitialData = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.clear()
  }, [])

  const { isPending, isError } = useGetInitialData()

  if (isPending) return <IsLoading />
  if (isError)
    throw new Error("Error in authorized layout while fetching initial data")

  return <RegisterPaymentsAndReturnStack />
}

//3. register payments and show the stack
const RegisterPaymentsAndReturnStack = () => {
  useRefetchOnAppStateChange()
  const user = useGetUser().user!
  useRegisterPurchaseObj({ user })
  //fetch stats state when user account is available
  useGetStatsState({ user })

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
