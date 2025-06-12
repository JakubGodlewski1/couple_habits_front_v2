import { PropsWithChildren } from "react"
import { SocketProvider } from "@/features/shared/websockets/context"
import { ShowCompletedHabitsProvider } from "@/features/showCompletedHabits/contexts/showCompletedHabitsContext"

export const MainLayoutProviders = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <ShowCompletedHabitsProvider>{children}</ShowCompletedHabitsProvider>
    </SocketProvider>
  )
}
