import { useGetPartnerRequest } from "@/features/shared/partnerRequests/api/hooks/useGetPartnerRequest"
import { useEffect } from "react"
import { usePartnerRequestModalContext } from "@/features/shared/partnerRequests/hooks/usePartnerRequestModalContext"
import { useWaitForPartnerResponseModalContext } from "@/features/shared/partnerRequests/hooks/useWaitForPartnerResponseModalContext"

/*open partner requests modals if needed*/

export const useTogglePartnerRequestModal = () => {
  const { data, isFetching } = useGetPartnerRequest()
  const {
    onOpen: onOpenPartnerRequestModal,
    onClose: onClosePartnerRequestModal,
  } = usePartnerRequestModalContext()
  const {
    onOpen: onOpenWaitForPartnerResponseModal,
    onClose: onWaitWaitForPartnerResponseModal,
  } = useWaitForPartnerResponseModalContext()

  useEffect(() => {
    if (!isFetching && data && "option" in data) {
      if (data.requestedBy === "partner") {
        onOpenPartnerRequestModal({
          data: data.data,
          option: data.option,
        })
      } else if (data.requestedBy === "user") {
        onOpenWaitForPartnerResponseModal()
      }
    } else if (!isFetching && (!data || Object.keys(data).length === 0)) {
      //close modals
      onClosePartnerRequestModal()
      onWaitWaitForPartnerResponseModal()
    }
  }, [data, isFetching])
}
