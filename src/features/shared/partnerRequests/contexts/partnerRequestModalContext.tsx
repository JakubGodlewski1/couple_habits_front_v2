import { createContext, PropsWithChildren, useState } from "react"
import {
  PartnerRequestModalContextType,
  PartnerRequestsOption,
} from "@/features/shared/partnerRequests/types/partnerRequests"

export const PartnerRequestModalContext =
  createContext<PartnerRequestModalContextType>({
    isOpen: false,
    onClose: () => {},
    onOpen: () => {},
    option: null,
    data: null,
  })

export const PartnerRequestModalProvider = ({
  children,
}: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const [option, setOption] = useState<PartnerRequestsOption | null>(null)
  const [data, setData] = useState<string | null>(null)

  return (
    <PartnerRequestModalContext.Provider
      value={{
        data,
        option,
        isOpen,
        onClose: () => {
          setIsOpen(false)
          setOption(null)
          setData(null)
        },
        onOpen: ({
          data,
          option,
        }: {
          option: PartnerRequestsOption
          data?: string
        }) => {
          setOption(option)
          if (data) setData(data)
          setIsOpen(true)
        },
      }}
    >
      {children}
    </PartnerRequestModalContext.Provider>
  )
}
