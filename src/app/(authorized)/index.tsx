import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { Redirect } from "expo-router"

export default function RedirectPage() {
  //move user to tutorial if they did not set up their partner name
  const { user } = useGetUser()

  const href =
    user!.partnerName !== "partner"
      ? "/home"
      : "/(authorized)/(tutorial)/how-to-play"
  return <Redirect href={href} />
}
