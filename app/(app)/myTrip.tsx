import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllTrip from "../components/myTrip/AllTrips";
import HistoryTrip from "../components/myTrip/HistoryTrip";
import StatusBar from "@/components/StatusBar";

const renderScene = SceneMap({
  first: AllTrip,
  second: HistoryTrip,
});

const routes = [
  { key: "first", title: "当前行程" },
  { key: "second", title: "历史行程" },
];

export default function MyTrip() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  // 自定义TabBar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      activeColor="#000"
      inactiveColor="#999"
      pressOpacity={0.8}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar title={"我的行程"} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        // sceneContainerStyle={styles.sceneContainer}
      />
    </SafeAreaView>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  sceneContainer: {
    padding: dp2px(16),
  },
  tabBar: {
    backgroundColor: "#FFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    elevation: 0, // Android去除阴影
    shadowOpacity: 0, // iOS去除阴影
  },
  indicator: {
    backgroundColor: "#000",
    height: 2,
  },
  label: {
    fontSize: dp2px(14),
    fontWeight: "500",
    textTransform: "none", // 去除默认大写转换
  },
  title: {
    fontSize: dp2px(20),
    fontWeight: "600",
    color: "#333333",
    marginBottom: dp2px(16),
  },
});
