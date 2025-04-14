import AddPlanButton from '@/components/AddPlanButton';
import { storage } from '@/utils';
import { Tabs } from 'expo-router';
import { ReactElement, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

function mackTabItem(comp: ReactElement, focused: boolean) {
  return (
    <View style={styles.tabItemContainer}>
      {comp}
      {focused && <View style={styles.tabItemDot} />}
    </View>
  )
}

export default function TabLayout() {
  const [showTabBar, setShowTabBar] = useState(true);

  useEffect(() => {
    const isLogin = async () => {
      const isLoginStatus = await storage.get('cookie')
      setShowTabBar(!!isLoginStatus)
    }
    isLogin()
  }, [])

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingHorizontal: 20,
          height: 100,
          display: showTabBar ? 'flex' : 'none',
        },
      }}
    >
      <Tabs.Screen
        name="createTab"
        options={{
          tabBarIcon: () => <AddPlanButton />,
          tabBarItemStyle: {
            flex: 2,
          }
        }}
      />
      <Tabs.Screen
        name="aiLink"
        options={{
          tabBarIcon: ({ focused }) => mackTabItem(<Image style={styles.icon} source={require('@/assets/images/ai-link.png')} />, focused),
          tabBarItemStyle: {
            flex: 1,
          }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => mackTabItem(<Image style={styles.icon} source={require('@/assets/images/home.png')} />, focused),
          tabBarItemStyle: {
            flex: 1,
          }
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemDot: {
    width: 4,
    height: 4,
    borderRadius: 24,
    backgroundColor: '#275b51',
    marginTop: 4
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32
  },
})
