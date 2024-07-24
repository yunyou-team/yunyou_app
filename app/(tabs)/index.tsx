import { globalColor } from "@/style/color";
import { LinearGradient } from "expo-linear-gradient";
import TripCarousel from "@/components/TripCarousel";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import GuideList from '../components/index/GuideList';
import { adaptScreenHight, adaptScreenWidth } from "@/utils";

export default function HomeScreen() {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image style={[styles.headerLeft, styles.menu]} source={require('@/assets/images/menu.png')} />
          <Text style={styles.nameText}>Hi, Lily 👋</Text>
        </View>
        <View style={styles.avatar} />
      </View>
    )
  }

  return (
    <ImageBackground source={require('@/assets/images/background.png')}
      style={{
        flex: 1,
      }}>
        <FocusAwareStatusBar />
        {renderHeader()}
        <Image style={styles.journeyTitle} source={require('@/assets/images/journey-title.png')}></Image>
        {/* <TripCarousel /> */}
        <Image style={styles.journeyMain} source={require('@/assets/images/bg-2.png')}></Image>
        <Image style={styles.guideTitle} source={require('@/assets/images/guide-title.png')}></Image>
        <GuideList></GuideList>
        {/* <MyDrawerComponent></MyDrawerComponent> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: adaptScreenHight(48),
    marginTop: 60,
    marginBottom: 32,
    paddingHorizontal: 18,
  },
  avatar: {
    width: adaptScreenWidth(42),
    height: adaptScreenHight(42),
    borderRadius: 50,
    backgroundColor: globalColor.THEME_ONE
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    width: adaptScreenWidth(24),
    height: adaptScreenHight(24)
  },
  nameText: {
    marginLeft: 8,
    fontWeight: 900,
    fontSize: 18,
    fontFamily: "MiSans"
  },
  journeyTitle: {
    width: adaptScreenWidth(96),
    height: adaptScreenHight(23),
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
  journeyMain: {
    width: adaptScreenWidth(376),
    height: adaptScreenHight(329),
    marginBottom: 24
  },
  guideTitle: {
    width: adaptScreenWidth(130),
    height: adaptScreenHight(24),
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
});
