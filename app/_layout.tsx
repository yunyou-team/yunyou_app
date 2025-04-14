import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <NavigationContainer>
      <Stack screenOptions={{ 
        headerShown: false,
        gestureEnabled: true,  
        animation: 'slide_from_right'  
      }}>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false  
          }} 
        />
        <Stack.Screen 
          name='(app)' 
          options={{ 
            headerShown: false,
            gestureEnabled: true  
          }} 
        />
      </Stack>
    </NavigationContainer>
  );
}
