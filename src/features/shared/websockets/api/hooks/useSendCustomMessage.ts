import { useSocket } from "@/features/shared/websockets/api/hooks/useSocket"

export const useSendCustomMessage = () => {
  const socket = useSocket()

  const sendCustomMessage = (message: string) => {
    socket?.emit("custom", { message })
  }

  return { sendCustomMessage }
}
