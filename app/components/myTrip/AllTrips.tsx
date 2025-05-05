import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import TripItem from "./Item";
import Empty from "@/components/Empty";

export default function AllTrip({
  recentTrip,
  historyTrips,
}: {
  recentTrip?: ITrips;
  historyTrips: ITrips[];
}) {
  return (
    <View style={styles.container}>
      {recentTrip && (
        <ImageBackground
          source={require("@/assets/images/myTrip/recently_card.png")}
          style={styles.recently}
        >
          <TripItem data={recentTrip} size="large" />
        </ImageBackground>
      )}
      <View style={styles.history}>
        <Text style={styles.historyTitle}>历史行程</Text>
        {!historyTrips?.length && (
          <View style={styles.empty}>
            <Empty iconName="travel-explore" text="暂无相关行程记录" />
          </View>
        )}
        {!!historyTrips?.length &&
          historyTrips?.map((trip, index) => (
            <TripItem key={index} data={trip} />
          ))}
      </View>
    </View>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dp2px(20),
    paddingVertical: dp2px(16),
  },
  recently: {
    paddingTop: dp2px(59),
    paddingHorizontal: dp2px(16),
    paddingBottom: dp2px(17),
    width: dp2px(374),
    height: dp2px(199),
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    height: dp2px(200),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: dp2px(16),
    paddingVertical: dp2px(12),
  },
  titleContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentlyTitle: {
    fontFamily: "MiSans",
    fontWeight: "600",
    fontSize: dp2px(20),
    lineHeight: dp2px(20),
    color: "#232301",
  },
  recentlyButton: {
    fontFamily: "PingFangSC-Medium",
    fontWeight: "500",
    fontSize: dp2px(12.72),
    lineHeight: dp2px(12.72),
    color: "#415605",
    textAlign: "right",
    marginRight: dp2px(8),
  },
  history: {
    paddingHorizontal: dp2px(16),
    paddingVertical: dp2px(16),
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 27,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: dp2px(17),
  },
});
