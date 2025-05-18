import { PropsWithChildren } from "react"
import { SocketProvider } from "@/features/shared/websockets/context"
import { PartnerRequestModalProvider } from "@/features/shared/partnerRequests/contexts/partnerRequestModalContext"
import { WaitForPartnerResponseModalContextProvider } from "@/features/shared/partnerRequests/contexts/waitForPartnerResponseModalContext"

export const MainLayoutProviders = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <PartnerRequestModalProvider>
        <WaitForPartnerResponseModalContextProvider>
          {children}
        </WaitForPartnerResponseModalContextProvider>
      </PartnerRequestModalProvider>
    </SocketProvider>
  )
}
