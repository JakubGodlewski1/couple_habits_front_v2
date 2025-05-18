import { useContext } from "react"
import { PartnerRequestModalContext } from "@/features/shared/partnerRequests/contexts/partnerRequestModalContext"

export const usePartnerRequestModalContext = () =>
  useContext(PartnerRequestModalContext)
