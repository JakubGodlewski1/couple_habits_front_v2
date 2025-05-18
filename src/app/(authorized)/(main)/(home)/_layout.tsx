import { Stack } from "expo-router"
import { useTogglePartnerRequestModal } from "@/features/shared/partnerRequests/hooks/useTogglePartnerRequestModals"

export default function HomeLayout() {
  useTogglePartnerRequestModal()

  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="add-partner"
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack>
  )
}
