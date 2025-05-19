import { Stack } from "expo-router"

export default function HomeLayout() {
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
