import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import AllTrip from "../components/myTrip/AllTrips";
import StatusBar from "@/components/StatusBar";
import Error from "@/components/Error";
import Trips from "../components/myTrip/Trips";
import Tabs from "@/components/Tabs";
import Empty from "@/components/Empty";
import { router } from "expo-router";
import { fetchMyTrip, ITrips } from "@/services/myTrip";

type TabRoute = {
  key: "first" | "second" | "third" | "fourth";
  title: string;
};

const routes: TabRoute[] = [
  { key: "first", title: "全部行程" },
  { key: "second", title: "待出行" },
  { key: "third", title: "已出行" },
];

export default function MyTrip() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<ITrips[] | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchMyTrip();
      setTrips(result);
    } catch (err: any) {
      setError(err?.message || "未知错误");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSortedTrips = () => {
    if (!trips)
      return {
        upcomingTrips: [],
        historyTrips: [],
        recentTrip: undefined,
        pastTrips: [],
      };
    const now = new Date();

    const upcomingTrips = trips.filter(
      (trip) => trip.trip.tripStartTime > now.getTime()
    );
    const historyTrips = trips.filter(
      (trip) => trip.trip.tripEndTime < now.getTime()
    );
    const pastTrips = trips.filter(
      (trip) => trip.trip.tripStartTime < now.getTime()
    );

    const recentTrip = trips.reduce(
      (prev: ITrips | undefined, current: ITrips) => {
        return prev && prev.trip.updatedAt > current.trip.updatedAt
          ? prev
          : current;
      },
      undefined
    );

    return { upcomingTrips, historyTrips, recentTrip, pastTrips };
  };

  const { upcomingTrips, historyTrips, recentTrip, pastTrips } =
    getSortedTrips();

  const onBackPress = () => {
    router.back();
  };

  return (
    <>
      <ImageBackground
        source={require("@/assets/images/myTrip/trip_bg.png")}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar
            title={"我的行程"}
            backgroundColor="transparent"
            onBackPress={onBackPress}
          />

          {error ? (
            <Error error={error} onPress={fetchData} />
          ) : loading ? (
            <Empty iconName="hourglass-empty" text="正在加载行程..." />
          ) : (
            <Tabs tabs={routes} activeIndex={activeTab} onChange={setActiveTab}>
              <AllTrip recentTrip={recentTrip} historyTrips={historyTrips} />
              <Trips data={upcomingTrips} />
              <Trips data={pastTrips} />
            </Tabs>
          )}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = createAdaptStyleSheet.create({
  background: {
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabBar: {
    backgroundColor: "transparent",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    justifyContent: "center",
    position: "relative",
  },
  indicator: {
    backgroundColor: "#000",
    height: 2,
    position: "absolute",
    left: "50%",
    marginLeft: -10,
    width: 20,
    transform: [{ translateX: -10 }],
  },
  globalLoading: {
    position: "absolute",
    right: 16,
    top: 12,
  },
});
