import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ gestureEnabled: false }} >
      <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: true,animation: 'none' }} />
      <Stack.Screen name="phoneLogin" options={{ headerShown: false,gestureEnabled: true }} />
      <Stack.Screen name="create" options={{ headerShown: false,gestureEnabled: true }} />
      <Stack.Screen name="myTrip" options={{ headerShown: false,gestureEnabled: true }} />
    </Stack>
  )
}
