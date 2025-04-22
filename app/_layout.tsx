import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native'; 
import { storage } from '@/utils';
import FirstLogin from './components/login/FirstLoading'

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>('(app)');

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const cookie = await storage.get('cookie');
      // 模拟验证冷启登录态
      await new Promise(resolve => setTimeout(resolve, 3000));
      setInitialRoute(cookie ? '(tabs)' : '(app)');
    } catch (error) {
      console.error('Error checking cookie:', error);
      setInitialRoute('(app)');
    } finally {
      setIsLoading(false);
      console.log('加载完成');
    }
  };

  return (
    <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack 
              screenOptions={{ 
                headerShown: false,
                gestureEnabled: false,
              }}
            >
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
                  gestureEnabled: true,
                }} 
              />
            </Stack>
          </NavigationContainer>
       
    </View>
  );
}
