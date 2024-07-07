import AddPlanButton from '@/components/AddPlanButton';
import { Tabs } from 'expo-router';
import { ReactElement } from 'react';
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingHorizontal: 20,
          height: 100,
        },
      }}
    >
      <Tabs.Screen
        name="createTab"
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
          tabBarIcon: ({focused}) => mackTabItem(<Image source={require('../../assets/images/ailink.png')} />, focused),
          tabBarItemStyle: {
            flex: 0.5
          }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({focused}) => mackTabItem(<Image source={require('../../assets/images/home.png')} />, focused),
          tabBarItemStyle: {
            flex: 0.5
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
  },
  tabItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#275b51',
    marginTop: 4
  }
})
