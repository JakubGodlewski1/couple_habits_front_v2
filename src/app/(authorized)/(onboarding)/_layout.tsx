import { Stack } from "expo-router"

export const onboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  )
}

export default onboardingLayout
