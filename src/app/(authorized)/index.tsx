import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Redirect } from "expo-router"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

export default function RedirectPage() {
  //move user to tutorial if they did not set up their partner name
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  const href =
    user!.partnerName !== "partner" ? "/home" : "/(authorized)/(onboarding)"
  return <Redirect href={href} />
}
