import { Redirect } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"
import IsLoadingLogo from "@/components/IsLoadingLogo"

export default function RootPage() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <IsLoadingLogo />
  if (!isSignedIn) return <Redirect href="/hero" />
  return <Redirect href="/(authorized)" />
}
