import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import TripItem from "./Item";
import Empty from "@/components/Empty";
import { ITrips } from "@/services/myTrip";

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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  recently: {
    paddingTop: 59,
    paddingHorizontal: 16,
    paddingBottom: 17,
    width: 374,
    height: 199,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    height: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 20,
    lineHeight: 20,
    color: "#232301",
  },
  recentlyButton: {
    fontFamily: "PingFangSC-Medium",
    fontWeight: "500",
    fontSize: 12.72,
    lineHeight: 12.72,
    color: "#415605",
    textAlign: "right",
    marginRight: 8,
  },
  history: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 27,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 17,
  },
});
