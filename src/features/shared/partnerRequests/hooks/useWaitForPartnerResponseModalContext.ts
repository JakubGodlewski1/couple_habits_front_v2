import { useContext } from "react"
import { WaitForPartnerResponseModalContext } from "@/features/shared/partnerRequests/contexts/waitForPartnerResponseModalContext"
import { WaitForPartnerResponseModalContextType } from "@/features/shared/partnerRequests/types/partnerRequests"

export const useWaitForPartnerResponseModalContext = () =>
  useContext<WaitForPartnerResponseModalContextType>(
    WaitForPartnerResponseModalContext,
  )
