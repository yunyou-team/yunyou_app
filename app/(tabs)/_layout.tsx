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
        tabBarStyle: {
          paddingHorizontal: 20,
          height: 100,
        }
      }}
    >
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <AddPlanButton />,
          tabBarItemStyle: {
            flex: 1
          }
        }}
      />
      <Tabs.Screen
        name="ailink"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/ailink.png')} />,
          tabBarItemStyle: {
            flex: 0.5
          }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <Image source={require('../../assets/images/home.png')} />,
          tabBarItemStyle: {
            flex: 0.5
          }
        }}
      />
    </Tabs>
  );
}
