import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Redirect } from "expo-router"

export default function RedirectPage() {
  //move user to tutorial if they did not set up their partner name
  const user = useGetUser().user

  const href =
    user!.partnerName !== "partner" ? "/home" : "/(authorized)/(onboarding)"
  return <Redirect href={href} />
}
