import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import { TabView, SceneMap, TabBar, Route } from "react-native-tab-view";
import AllTrip from "../components/myTrip/AllTrips";
import HistoryTrip from "../components/myTrip/HistoryTrip";
import StatusBar from "@/components/StatusBar";
import { fetchMyTrip } from "@/services";
import Error from "@/components/Error";
import Empty from "@/components/Empty";

type TabRoute = Route & {
  key: "first" | "second";
  title: string;
};

interface SceneProps {
  route: TabRoute;
  data?: ITrips[];
  loading?: boolean;
}

const renderScene = ({ route, data, loading }: SceneProps) => {
  const sceneProps = { data, loading };

  switch (route.key) {
    case "first":
      return <AllTrip {...sceneProps} />;
    case "second":
      return <HistoryTrip {...sceneProps} />;
    default:
      return null;
  }
};

const routes: TabRoute[] = [
  { key: "first", title: "当前行程" },
  { key: "second", title: "历史行程" },
];

export default function MyTrip() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ITrips[] | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchMyTrip();
      setData(result);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTabBar = (
    props: React.ComponentProps<typeof TabBar<TabRoute>>
  ) => (
    <View>
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        activeColor="#000"
        inactiveColor="#999"
        pressOpacity={0.8}
      />
      {loading && (
        <View style={styles.globalLoading}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar title={"我的行程"} />

      {error ? (
        <Error error={error} onPress={fetchData} />
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={(props) => {
            if (loading)
              return (
                <Empty iconName="hourglass-empty" text="正在加载行程..." />
              );
            if (!data?.length)
              return (
                <Empty iconName="travel-explore" text="暂无相关行程记录" />
              );
            return renderScene({ ...props, data, loading });
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
          swipeEnabled={!loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabBar: {
    backgroundColor: "#FFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: "#000",
    height: 2,
  },
  globalLoading: {
    position: "absolute",
    right: dp2px(16),
    top: dp2px(12),
  },
});
