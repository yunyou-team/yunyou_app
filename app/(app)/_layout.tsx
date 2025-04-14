import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="create" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: true }} />
    </Stack>
  )
}
