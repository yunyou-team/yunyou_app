import { router } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet, TouchableHighlight } from "react-native";

type cardProps = {
  imageSource: object,
  buttonText: string,
  routerSource: string
}

export default function FirstCard({ imageSource, buttonText, routerSource }: cardProps) {
  const handleAdd = () => {
    console.log("=====添加=====");
    router.push(routerSource);
  };

  return (
    <TouchableHighlight
      onPressOut={handleAdd}
      underlayColor="#DDDDDD">
      <View style={styles.card}>
        <View style={styles.box}>
          <Image style={styles.img} source={imageSource} resizeMode="cover" />
          <Text style={styles.subtitle}>期待第一条行程</Text>
        </View>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 376,
    height: 240,
    borderRadius: 16,
    backgroundColor: "#EFFBFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#C6C6C6",
    fontFamily: "PingFang SC",
  },
  buttonText: {
    fontSize: 28,
    color: "#10D3B1",
    fontFamily: "MiSans",
    fontWeight: "bold",
    letterSpacing: 1,
    margin: 20,
  },
});
