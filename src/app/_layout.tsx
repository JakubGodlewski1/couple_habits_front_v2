import { Stack } from "expo-router"
import "react-native-reanimated"
import { StatusBar } from "expo-status-bar"
import "../config/global.css"
import { GlobalProviders } from "@/providers/GlobalProviders"
import "@/config/reanimatedConfig"
import ErrorBoundaryPage from "@/app/ErrorBoundaryPage"

export function ErrorBoundary() {
  return <ErrorBoundaryPage />
}

export default function RootLayout() {
  return (
    <GlobalProviders>
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <StatusBar style={"dark"} translucent={true} />
    </GlobalProviders>
  )
}
