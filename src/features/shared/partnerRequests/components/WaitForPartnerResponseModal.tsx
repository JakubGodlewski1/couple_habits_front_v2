import ModalSmall from "@/components/ModalSmall"
import { Image, View } from "react-native"
import Text from "@/components/Text"
import Button from "@/components/Button"
import useDeletePartnerRequest from "@/features/shared/partnerRequests/api/hooks/useDeletePartnerRequest"
import time from "../../../../assets/illustrations/time.png"
import { useEffect } from "react"
import { showToast } from "@/utils/showToast"
import { useWaitForPartnerResponseModalContext } from "@/features/shared/partnerRequests/hooks/useWaitForPartnerResponseModalContext"
import { useSendCustomMessage } from "@/features/shared/websockets/api/hooks/useSendCustomMessage"
import AntDesign from "@expo/vector-icons/AntDesign"
import { TouchableOpacity } from "react-native"

export const WaitForPartnerResponseModal = () => {
  const { deletePartnerRequest, isPending, isError, isSuccess } =
    useDeletePartnerRequest()
  const { isOpen, onClose } = useWaitForPartnerResponseModalContext()
  const { sendCustomMessage } = useSendCustomMessage()

  useEffect(() => {
    if (isSuccess) sendCustomMessage("Your partner cancelled the request")
    if (isError) {
      showToast({
        type: "error",
        message: "Something went wrong",
        extraMessage: "If it persist, Contact us on contact@couplehabits.com",
      })
    }
    onClose()
  }, [isError, isSuccess])

  return (
    <ModalSmall isOpen={isOpen} onClose={onClose}>
      <View className="w-[85vw] max-w-[400px]">
        <TouchableOpacity activeOpacity={5} onPress={onClose}>
          <View className="flex-row p-4 justify-end">
            <AntDesign name="close" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <Image
          resizeMode="contain"
          className="mx-auto w-full h-[200px] rounded-lg"
          source={time}
        />
        <Text
          type="h3"
          className="text-center font-semibold text-gray-900 mt-4"
        >
          Waiting for your partner to accept the request
        </Text>

        <View className="flex-row gap-3 mt-6">
          <Button
            disabled={isPending}
            type="error"
            classNames={{
              wrapper: "flex-1 py-3 rounded-lg border border-gray-300",
            }}
            onPress={() => {
              deletePartnerRequest()
              onClose()
            }}
            title="Cancel"
          />
        </View>
      </View>
    </ModalSmall>
  )
}
