import React from "react";
import { View, useWindowDimensions } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import TripItem from "./Item";
import Empty from "@/components/Empty";

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
              <View style={styles.item}>
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
    paddingTop: dp2px(16),
    paddingHorizontal: dp2px(19),
  },
  title: {
    fontSize: dp2px(20),
    fontWeight: "600",
    color: "#333333",
    marginBottom: dp2px(16),
  },
  items: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: dp2px(16),
    // paddingVertical: dp2px(16),
  },
  item: {
    paddingVertical: dp2px(17),
    // marginTop:
  },
});
