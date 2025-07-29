import { PropsWithChildren } from "react"
import { SocketProvider } from "@/features/shared/websockets/context"
import { ShowCompletedHabitsProvider } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"
import { ConfettiProvider } from "@/contexts/ConfettiContext"

export const MainLayoutProviders = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <ConfettiProvider>
        <ShowCompletedHabitsProvider>{children}</ShowCompletedHabitsProvider>
      </ConfettiProvider>
    </SocketProvider>
  )
}
