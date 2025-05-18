import { Image, View } from "react-native"
import ModalSmall from "@/components/ModalSmall"
import { usePartnerRequestModalContext } from "@/features/shared/partnerRequests/hooks/usePartnerRequestModalContext"
import Button from "@/components/Button"
import Text from "@/components/Text"
import { useGetPartnerRequestFunction } from "@/features/shared/partnerRequests/requests/useGetPartnerRequestFunction"
import { modalDetails } from "@/features/shared/partnerRequests/requests/modalDetails"
import { useSendCustomMessage } from "@/features/shared/websockets/api/hooks/useSendCustomMessage"
import useDeletePartnerRequest from "@/features/shared/partnerRequests/api/hooks/useDeletePartnerRequest"
import { PartnerRequestModalContextType } from "@/features/shared/partnerRequests/types/partnerRequests"
import PartnerRequestHabitDetails from "@/features/shared/partnerRequests/components/partnerRequestModal/PartnerRequestHabitDetails"

/*modal that will show up to the user that got request from their partner */

const PartnerRequestModal = ({
  partnerRequestModalContext: { option, isOpen, onClose, data },
}: {
  partnerRequestModalContext: PartnerRequestModalContextType
}) => {
  const { sendCustomMessage } = useSendCustomMessage()

  const { deletePartnerRequest, isPending: isDeletePartnerRequestPending } =
    useDeletePartnerRequest()
  const { onPress, isPending } = useGetPartnerRequestFunction({
    data,
    option: option!,
  })

  const {
    img,
    buttons: { onCancel, onAccept },
    title,
  } = modalDetails[option!]

  return (
    <ModalSmall onClose={onClose} isOpen={isOpen}>
      <View className="w-[85vw] max-w-[400px]">
        <Image
          resizeMode="contain"
          className="mx-auto w-full h-[250px] max-h-[90vh] rounded-lg"
          source={img}
        />
        <Text
          type="h3"
          className="text-center font-semibold text-gray-900 mt-4"
        >
          {title}
        </Text>
        <PartnerRequestHabitDetails data={data} />
        <View className="flex-row gap-3 mt-6">
          <Button
            disabled={isPending || isDeletePartnerRequestPending}
            type="subtle"
            classNames={{
              wrapper: "flex-1 py-3 rounded-lg border border-gray-300",
            }}
            onPress={() => {
              onClose()
              sendCustomMessage(onCancel.messageToPartner)
              deletePartnerRequest()
            }}
            title={onCancel.label}
          />
          <Button
            disabled={isPending || isDeletePartnerRequestPending}
            type="secondary"
            classNames={{ wrapper: "flex-1 py-3 rounded-lg" }}
            onPress={() => {
              onClose()
              onPress()
              sendCustomMessage(onAccept.messageToPartner)
            }}
            title={onAccept.label}
          />
        </View>
      </View>
    </ModalSmall>
  )
}

//if the option does not exist, don't render the component at all
const PartnerRequestModalWrapper = () => {
  const partnerRequestModalContext = usePartnerRequestModalContext()
  if (!partnerRequestModalContext.option) return null
  return (
    <PartnerRequestModal
      partnerRequestModalContext={partnerRequestModalContext}
    />
  )
}

export default PartnerRequestModalWrapper
