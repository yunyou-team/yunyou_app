import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <NavigationContainer>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(app)' options={{ headerShown: false }} />
      </Stack>
    </NavigationContainer>
  );
}
