import { ClerkProvider } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import { PropsWithChildren } from "react"

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error("getToken error", error)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error("saveToken error", error)
    }
  },
}

export const ClerkProviderWithToken = ({ children }: PropsWithChildren) => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  )
}
