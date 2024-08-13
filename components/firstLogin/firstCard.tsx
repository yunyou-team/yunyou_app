import { router } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet, TouchableHighlight, Button } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

type cardProps = {
  imageSource: object,
  buttonText: string,
  routerSource: string,
  subText: string,
  imageStyle: object,
  mainText: string
}

const GradientText = ({ colors, locations, start, end, text, textStyle, imageStyle }) => {
  return (
    <MaskedView maskElement={<Text style={textStyle}>{text}</Text>}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.gradient}
      >
        <Text style={[textStyle]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default function FirstCard({ imageSource, mainText, routerSource, subText, buttonText, imageStyle}: cardProps) {
  const handleAdd = () => {
    console.log("=====添加=====");
    router.push(routerSource);
  };

  return (
    <TouchableHighlight
      style={{ borderRadius: 16 }}
      onPressOut={handleAdd}
      underlayColor="#DDDDDD"
    >
      <View style={styles.card}>
        <LinearGradient
          colors={['#D3FF53', '#FFF853']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.4977, 0.9345]}
          style={[styles.gradientBackground,styles.shadowBox]}
        >
          <View style={styles.container}>
            <View>
              <View style={styles.text}> 
                <GradientText
                  colors={['#232301', '#628400']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0.5568, 0.9673]}
                  text={mainText}
                  textStyle={styles.mainText}
                />
                <Text style={styles.subText}>{subText}</Text>
              </View>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            </View>
            <View>
            <Image
              source={imageSource}
              style={imageStyle}
            />
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 376,
    height: 240,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    position: 'relative',
    padding: 10
  },
  mainText: {
    fontSize: 30,
    fontFamily: "MiSans",
    fontWeight: "600",
    letterSpacing: 1,
    margin: 10,
    textAlign: "left"
  },
  shadowBox: {
    backgroundColor: 'white',
    shadowColor: '#A9CBC8', // 阴影颜色
    shadowOffset: { width: 0, height: 3 }, // 阴影偏移
    shadowOpacity: 0.2, // 阴影透明度
    shadowRadius: 25.6, // 阴影半径
  },
  subText: {
    fontFamily: 'PingFang SC',
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 11
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 24,
    backgroundColor: '#FFFFFF8C',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 30
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'row', // 水平分布
    justifyContent: 'space-between', // 子组件之间的间距均匀分布
    alignItems: 'center', // 垂直居中
  },
});