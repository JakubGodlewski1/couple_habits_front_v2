import { PropsWithChildren } from "react"
import { SocketProvider } from "@/features/shared/websockets/context"

export const MainLayoutProviders = ({ children }: PropsWithChildren) => {
  return <SocketProvider>{children}</SocketProvider>
}
