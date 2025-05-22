import Button from "../../../components/Button"
import { router } from "expo-router"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

export default function GoToAddPartnerPageBtn() {
  const { setIsHidden } = useHideTabbarContext()
  const { user, isPending, error } = useGetUser()

  if (isPending) return <IsLoading />
  if (error) return <IsError />

  return (
    <Button
      testID="add-partner"
      type="secondary"
      onPress={() => {
        setIsHidden(true)
        router.push("/add-partner")
      }}
      title={`Connect with ${user!.partnerName}`}
    />
  )
}
