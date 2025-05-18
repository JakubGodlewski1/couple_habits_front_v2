import { useRef } from "react"
import { Socket } from "socket.io-client"
import { useAuth } from "@clerk/clerk-expo"

const MAX_RECONNECT_TRIES = 10
const RECONNECT_DELAY = 1500 // Delay between reconnect attempts

export const useRootEvents = () => {
  const reconnectTriesRef = useRef(0)
  const { getToken } = useAuth()

  const attemptReconnect = async (socketInstance: Socket) => {
    if (reconnectTriesRef.current >= MAX_RECONNECT_TRIES) {
      console.warn("Max reconnection attempts reached. Stopping reconnect.")
      return
    }

    reconnectTriesRef.current += 1
    console.log(`🔄 Reconnect attempt #${reconnectTriesRef.current}`)

    setTimeout(async () => {
      try {
        // Refresh the token
        const token = await getToken()
        socketInstance.auth = { token }
        socketInstance.connect()
      } catch (error) {
        console.error("Failed to refresh token for WebSocket:", error)
      }
    }, RECONNECT_DELAY)
  }

  const initRootEvents = (socketInstance: Socket) => {
    socketInstance.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socketInstance.id)
      reconnectTriesRef.current = 0 // Reset retry count
    })

    socketInstance.on("connect_error", (err) => {
      console.error("❌ WebSocket connection error:", err.message)

      // Check if it's an authentication issue
      if (err.message.includes("Unauthorized")) {
        console.warn("⚠️ Authentication failed. Retrying...")
        attemptReconnect(socketInstance)
      }
    })

    socketInstance.on("disconnect", () => {
      console.warn("⚠️ WebSocket disconnected.")
      attemptReconnect(socketInstance)
    })

    socketInstance.on("Unauthorized", async () => {
      console.warn("⚠️ WebSocket Unauthorized event.")
      attemptReconnect(socketInstance)
    })
  }

  return { initRootEvents }
}
