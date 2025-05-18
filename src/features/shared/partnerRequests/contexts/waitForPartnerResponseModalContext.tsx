import { createContext, PropsWithChildren, useState } from "react"
import { WaitForPartnerResponseModalContextType } from "@/features/shared/partnerRequests/types/partnerRequests"

export const WaitForPartnerResponseModalContext =
  createContext<WaitForPartnerResponseModalContextType>({
    isOpen: false,
    onClose: () => {},
    onOpen: () => {},
  })

export const WaitForPartnerResponseModalContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <WaitForPartnerResponseModalContext.Provider
      value={{
        isOpen,
        onClose: () => setIsOpen(false),
        onOpen: () => setIsOpen(true),
      }}
    >
      {children}
    </WaitForPartnerResponseModalContext.Provider>
  )
}
