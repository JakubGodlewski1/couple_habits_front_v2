import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HideTabbarProvider } from "@/contexts/HideTabbar"
import Toast from "react-native-toast-message"
import { ClerkProviderWithToken } from "@/features/auth/components/ClerkProviderWithToken"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const GlobalProviders = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        staleTime: Infinity,
      },
    },
  })

  return (
    <ClerkProviderWithToken>
      <QueryClientProvider client={queryClient}>
        <HideTabbarProvider>
          <GestureHandlerRootView>{children}</GestureHandlerRootView>
          <Toast />
        </HideTabbarProvider>
      </QueryClientProvider>
    </ClerkProviderWithToken>
  )
}
