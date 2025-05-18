import { useMutation } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { PartnerRequestToBackend } from "@/features/shared/partnerRequests/types/partnerRequests"
import { useWaitForPartnerResponseModalContext } from "@/features/shared/partnerRequests/hooks/useWaitForPartnerResponseModalContext"
import { queryKeys } from "@/config/queryKeys"

type Props = {
  onSettled?: () => void
}

export default function useSendRequestToPartner(
  { onSettled }: Props = { onSettled: () => {} },
) {
  const { getAxiosInstance } = useAxios()
  const { onOpen, onClose } = useWaitForPartnerResponseModalContext()

  const sendRequestToPartnerMutation = async ({
    option,
    data,
  }: PartnerRequestToBackend): Promise<void> => {
    //optimistic update - open the modal for waiting for partner response
    onOpen()

    //send request
    const axios = await getAxiosInstance()
    return axios.post("/partner-requests", {
      option,
      data, //as json
    })
  }

  const {
    mutate: sendRequestToPartner,
    isPending,
    error,
  } = useMutation({
    mutationKey: queryKeys.partnerRequests.send,
    mutationFn: sendRequestToPartnerMutation,
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      showToast({
        type: "error",
        message: message || "Something went wrong",
      })
      onClose()
    },
    onSettled,
  })

  return { sendRequestToPartner, isPending, error }
}
