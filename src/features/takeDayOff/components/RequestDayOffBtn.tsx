import Button from "@/components/Button"
import Text from "@/components/Text"
import { useGetDayOffPrice } from "@/features/takeDayOff/api/hooks/useGetDayOffPrice"
import { useValidateTakeDayOff } from "@/features/takeDayOff/hooks/useValidateTakeDayOff"
import { showToast } from "@/utils/showToast"
import useSendRequestToPartner from "@/features/shared/partnerRequests/api/hooks/useSendRequestToPartner"
import { router } from "expo-router"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export default function RequestDayOffBtn() {
  const { data, isPending: isPriceFetching } = useGetDayOffPrice()
  const { user } = useGetUser()

  //check if user can take day off
  const { validateTakeDayOff } = useValidateTakeDayOff()
  const { sendRequestToPartner } = useSendRequestToPartner()

  const onSubmit = () => {
    const result = validateTakeDayOff(data?.dayOffPrice)
    if (!result.result) {
      return showToast({
        type: "error",
        message: "we have a problem...",
        extraMessage: result.message,
      })
    }

    //send request for a day off to partner
    router.push("/home")
    showToast({
      type: "success",
      message: "A request has been sent",
      extraMessage: "Your partner has to accept the request for a day off",
    })

    sendRequestToPartner({ option: "takeDayOff" })
  }

  return user?.hasPartner ? (
    <Button
      classNames={{ wrapper: `justify-between` }}
      iconPosition="right"
      type="success"
      disabled={isPriceFetching}
      onPress={onSubmit}
      title="Take a day off"
    >
      <Text className="text-green-600">{data?.dayOffPrice || "-"} points</Text>
    </Button>
  ) : null
}
