import { useGetPartnerRequest } from "@/features/shared/partnerRequests/api/hooks/useGetPartnerRequest"
import IsError from "@/components/IsError"
import IsLoading from "@/components/IsLoading"
import Modal from "@/components/Modal"
import ResponseToSkipHabitForm from "@/features/shared/partnerRequests/forms/ResponseToSkipHabitForm"
import ResponseToAnyRequestForm from "@/features/shared/partnerRequests/forms/ResponseToAnyRequestForm"

function PartnerRequestModal({
  partnerRequestData,
}: {
  partnerRequestData: PartnerRequestFromBackend
}) {
  //based on the option, render the form
  const formMap: Record<RequestOption, any> = {
    skipHabit: ResponseToSkipHabitForm,
    response: ResponseToAnyRequestForm,
  }

  const Form = formMap[partnerRequestData.option!]

  return (
    <Modal
      isOpen={
        !!partnerRequestData.option &&
        partnerRequestData.requestedBy === "partner"
      }
      onClose={() => {}}
    >
      {!!partnerRequestData.option && (
        <Form partnerRequestData={partnerRequestData} />
      )}
    </Modal>
  )
}

export default function PartnerRequestModalWrapper() {
  const { isError, isPending, data } = useGetPartnerRequest()

  if (isError) return <IsError />
  if (isPending) return <IsLoading />

  return <PartnerRequestModal partnerRequestData={data!} />
}
