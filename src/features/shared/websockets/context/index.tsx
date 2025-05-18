import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useAuth } from "@clerk/clerk-expo"
import { useRootEvents } from "@/features/shared/websockets/events/useRootEvents"
import { useAppEvents } from "@/features/shared/websockets/events/useAppEvents"
import { WEBSOCKET_API_URL } from "@/config/apiUrl"

export const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { getToken } = useAuth()
  const { initRootEvents } = useRootEvents()
  const { initAppEvents } = useAppEvents()

  const initSocket = async () => {
    const token = await getToken()

    if (!token) {
      console.error("No token found, cannot establish WebSocket connection.")
      return
    }

    const socketInstance = io(WEBSOCKET_API_URL, {
      auth: { token },
      reconnection: true,
    })

    initRootEvents(socketInstance)
    initAppEvents(socketInstance)
    setSocket(socketInstance)
  }

  useEffect(() => {
    initSocket()

    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
