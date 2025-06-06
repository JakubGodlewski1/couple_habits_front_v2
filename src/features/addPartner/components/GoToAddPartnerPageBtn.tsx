import Button from "../../../components/Button"
import { router } from "expo-router"
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export default function GoToAddPartnerPageBtn() {
  const { setIsHidden } = useHideTabbarContext()
  const user = useGetUser().user!

  return (
    <Button
      testID="add-partner"
      type="secondary"
      onPress={() => {
        setIsHidden(true)
        router.push("/add-partner")
      }}
      title={`Connect with ${user.partnerName}`}
    />
  )
}
