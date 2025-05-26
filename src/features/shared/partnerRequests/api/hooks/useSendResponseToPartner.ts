import { useMutate } from "@/api/hooks/useMutate"

export const useSendResponseToPartner = () => {
  const { create, isPending } = useMutate<CreatePartnerRequest>({
    endpoint: "/partner-requests",
  })

  const sendResponse = (accepted: boolean) => {
    create({
      data: JSON.stringify({ accepted, option: "skipHabit" }),
      option: "response",
    })
  }

  return { sendResponse, isPending }
}
