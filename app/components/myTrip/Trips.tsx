import React from "react";
import { View, useWindowDimensions } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import TripItem from "./Item";
import Empty from "@/components/Empty";
import { ITrips } from "@/services/myTrip";

export default function Trips({ data }: { data: ITrips[] }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <>
      {!data?.length && (
        <Empty iconName="travel-explore" text="暂无相关行程记录" />
      )}
      {!!data?.length && (
        <View style={styles.container}>
          <View style={styles.items}>
            {data.map((tripData, index) => (
              <View style={styles.item} key={index}>
                <TripItem key={index} data={tripData} />
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 19,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  items: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    // paddingVertical: 16,
  },
  item: {
    paddingVertical: 17,
    // marginTop:
  },
});
