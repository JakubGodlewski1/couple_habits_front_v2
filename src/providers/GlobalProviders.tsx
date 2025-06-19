import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HideTabbarProvider } from "@/contexts/HideTabbar"
import Toast from "react-native-toast-message"
import { ClerkProviderWithToken } from "@/features/auth/components/ClerkProviderWithToken"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { TutorialContextProvider } from "@/features/tutorial/contexts/tutorialContext"
import { TutorialRefProvider } from "@/features/tutorial/contexts/tutorialRefContext"
import { PostHogProvider } from "posthog-react-native"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
    },
  },
})

export const GlobalProviders = ({ children }: PropsWithChildren) => {
  return (
    <PostHogProvider
      apiKey="phc_AxEADyUSD6C2HmXhxB5QppzvBFVJ00gmBzfepjesgS4"
      options={{
        host: "https://ph.couplehabits.com",
        enableSessionReplay: true,
        sessionReplayConfig: {
          maskAllTextInputs: false,
          maskAllImages: true,
          captureLog: true,
          captureNetworkTelemetry: true,
          androidDebouncerDelayMs: 500,
          iOSdebouncerDelayMs: 1000,
        },
      }}
    >
      <ClerkProviderWithToken>
        <QueryClientProvider client={queryClient}>
          <TutorialContextProvider>
            <TutorialRefProvider>
              <HideTabbarProvider>
                <GestureHandlerRootView>{children}</GestureHandlerRootView>
                <Toast />
              </HideTabbarProvider>
            </TutorialRefProvider>
          </TutorialContextProvider>
        </QueryClientProvider>
      </ClerkProviderWithToken>
    </PostHogProvider>
  )
}
