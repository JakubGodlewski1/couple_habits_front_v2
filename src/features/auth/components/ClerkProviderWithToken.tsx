import { ClerkProvider } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import { ActivityIndicator, View } from "react-native"
import { useAuth } from "@clerk/clerk-expo"
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

const InnerClerkProvider = ({ children }: PropsWithChildren) => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <>{children}</>
}

export const ClerkProviderWithToken = ({ children }: PropsWithChildren) => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InnerClerkProvider>{children}</InnerClerkProvider>
    </ClerkProvider>
  )
}
