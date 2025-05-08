import AddPlanButton from "@/components/AddPlanButton";
import { storage } from "@/utils";
import { Tabs, Redirect } from "expo-router";
import { ReactElement, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

function mackTabItem(comp: ReactElement, focused: boolean) {
  return (
    <View style={styles.tabItemContainer}>
      {comp}
      {focused && <View style={styles.tabItemDot} />}
    </View>
  );
}

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const cookie = await storage.get("cookie");
      setIsLoggedIn(!!cookie);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(app)/login" />;
  }

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
        },
      }}
    >
      <Tabs.Screen
        name="createTab"
        options={{
          tabBarIcon: () => <AddPlanButton />,
          tabBarItemStyle: {
            flex: 2,
          },
        }}
      />
      <Tabs.Screen
        name="aiSelect"
        options={{
          tabBarIcon: ({ focused }) =>
            mackTabItem(
              <Image
                style={styles.icon}
                source={require("@/assets/images/ai-link.png")}
              />,
              focused
            ),
          tabBarItemStyle: {
            flex: 1,
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) =>
            mackTabItem(
              <Image
                style={styles.icon}
                source={require("@/assets/images/home.png")}
              />,
              focused
            ),
          tabBarItemStyle: {
            flex: 1,
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemDot: {
    width: 4,
    height: 4,
    borderRadius: 24,
    backgroundColor: "#275b51",
    marginTop: 4,
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
});
