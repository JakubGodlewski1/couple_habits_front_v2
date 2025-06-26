import { useAuth } from "@clerk/clerk-expo"
import IsLoading from "@/components/IsLoading"
import { Redirect, Stack } from "expo-router"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useRegisterPurchaseObj } from "@/features/subscriptions/hooks/useRegisterPurchaseObj"
import { useGetInitialData } from "@/hooks/useGetInitialData"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useRefetchOnAppStateChange from "@/hooks/useRefetchOnAppStateChange"

const AuthorizedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <IsLoading />
  if (!isSignedIn) return <Redirect href="/(unauthorized)/sign-in" />

  return <ClearCache />
}

// 2. Clear entire cache before refetching all data
const ClearCache = () => {
  const queryClient = useQueryClient()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    queryClient.clear()
    setReady(true)
  }, [])

  if (!ready) return <IsLoading />

  return <GetInitialData />
}

// 3. Fetch all initial data
const GetInitialData = () => {
  const { isPending, isError } = useGetInitialData()

  if (isPending) return <IsLoading />
  if (isError)
    throw new Error("Error in authorized layout while fetching initial data")

  return <RegisterPaymentsAndReturnStack />
}

// 4. Register payments and show the stack
const RegisterPaymentsAndReturnStack = () => {
  useRefetchOnAppStateChange()
  const user = useGetUser().user!
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
