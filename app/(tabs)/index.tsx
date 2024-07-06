import { globalColor } from "@/style/color";
import { ImageBackground, Image, View, StyleSheet, Text } from "react-native";
import Primary from "../components/index/primary";
import GuideList from '../components/index/GuideList'
import { LinearGradient } from "expo-linear-gradient";
import TripCarousel from "@/components/TripCarousel";

export default function HomeScreen() {
  return (
    <ImageBackground source={require('@/assets/images/background.png')}
      style={{
        flex: 1,
      }}>
      <View style={styles.home}>
        <View style={styles.header}></View>
        {/* <Primary></Primary> */}
        {/* <LinearGradient
          colors={[]} // 定义渐变颜色数组
          start={{ x: 0, y: 0 }} // 渐变开始位置
          end={{ x: 1, y: 0 }} // 渐变结束位置
          style={styles.gradientText}
        >
          <Text style={styles.text}>渐变文本</Text>
        </LinearGradient> */}
        <TripCarousel />
        {/* <Image style={styles.journeyTitle} source={require('@/assets/images/journey-title.png')}></Image>
        <Image style={styles.journeyMain} source={require('@/assets/images/bg-2.png')}></Image>
        <Image style={styles.guideTitle} source={require('@/assets/images/guide-title.png')}></Image> */}
        <GuideList></GuideList>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  header: {
    height: 48,
    marginTop: 60,
    marginBottom: 59,
    backgroundColor: globalColor.THEME_ONE
  },
  journeyTitle: {
    width: 96,
    height: 23,
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
  journeyMain: {
    width: 376,
    height: 329
  },
  guideTitle: {
    width: 130,
    height: 24,
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
  gradientText: {

  },
  text: {
    backgroundColor: 'linear-gradient(297.36deg, #011F1A 57.58%, #089B89 102.06%)',
  }
});