import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import TripItem from "./Item";

const routes = [
  { key: "first", title: "First" },
  { key: "second", title: "Second" },
];

export default function AllTrip() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <View>
      <View style={styles.recently}></View>
      <View style={styles.history}>
        <TripItem />
      </View>
    </View>
  );
}

const styles = createAdaptStyleSheet.create({
  recently: {},
  history: {},
});
