import { Platform } from "react-native"

let endpoint = process.env.EXPO_PUBLIC_API_ENDPOINT

if (process.env.NODE_ENV === "development" && endpoint) {
  if (Platform.OS === "android") {
    endpoint = endpoint.replace("localhost", "10.0.2.2")
  }
}

export const WEBSOCKET_API_URL = endpoint
export const API_URL = `${endpoint}/api/v1`
