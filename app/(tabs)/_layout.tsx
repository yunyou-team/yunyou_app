import AddPlanButton from '@/components/AddPlanButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName='home'
    >
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <AddPlanButton />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/home.png')} />,
        }}
      />
      <Tabs.Screen
        name="ailink"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/ailink.png')} />,
        }}
      />
    </Tabs>
  );
}
