import { Frequency } from "@/features/habits/types/habitForm"

export type PartnerRequestsOption =
  | "takeDayOff"
  | "createHabit"
  | "updateHabit"
  | "deleteHabit"

type PartnerRequestFromBackend =
  | {
      requestedBy: "partner" | "user"
      option: PartnerRequestsOption
      data?: string
    }
  | object

type PartnerRequestToBackend = {
  option: PartnerRequestsOption
  data?: string
}

//modal contexts
type PartnerRequestModalContextType = {
  isOpen: boolean
  onClose: () => void
  onOpen: ({
    data,
    option,
  }: {
    option: PartnerRequestsOption
    data?: string
  }) => void
  option: null | PartnerRequestsOption
  data: string | null
}

type WaitForPartnerResponseModalContextType = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

type DataFromPartnerRequest = {
  details:
    | {
        type: "create" | "delete"
        partnerLabel: string
        userLabel: string
        frequency: Frequency
      }
    | {
        type: "update"
        before: {
          partnerLabel: string
          userLabel: string
          frequency: Frequency
        }
        after: {
          partnerLabel: string
          userLabel: string
          frequency: Frequency
        }
      }
  body: any
}
