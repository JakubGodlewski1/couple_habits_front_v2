import { Redirect, Stack } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"
import IsLoading from "@/components/IsLoading"

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <IsLoading />

  if (isSignedIn) return <Redirect href="/(authorized)" />

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
