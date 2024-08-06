import { Stack } from "expo-router"

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}

export default AuthLayout
