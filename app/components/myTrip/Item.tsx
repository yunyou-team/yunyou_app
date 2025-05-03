import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";

const routes = [
  { key: "first", title: "First" },
  { key: "second", title: "Second" },
];

export default function TripItem() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return <Text style={styles.title}>我的行程</Text>;
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    padding: dp2px(16),
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: dp2px(20),
    fontWeight: "600",
    color: "#333333",
    marginBottom: dp2px(16),
  },
});
