import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/ailink.png')}/>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/home.png')}/>,
        }}
      />
    </Tabs>
  );
}
