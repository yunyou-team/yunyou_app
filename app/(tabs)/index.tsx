import { globalColor } from "@/style/color";
import { LinearGradient } from "expo-linear-gradient";
import TripCarousel from "@/components/TripCarousel";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { Image, ImageBackground, Text, View } from 'react-native';
import GuideList from '../components/index/GuideList';
import { createAdaptStyleSheet } from '@/utils/index'
import { renderHeader } from "../components/index/HeadComponent";

export default function HomeScreen() {
  // const renderHeader = () => {
  //   return (
  //     <View style={styles.header}>
  //       <View style={styles.headerLeft}>
  //         <Image style={[styles.headerLeft, styles.menu]} source={require('@/assets/images/menu.png')} />
  //         <Text style={styles.nameText}>Hi, Lily 👋</Text>
  //       </View>
  //       <View style={styles.avatar} />
  //     </View>
  //   )
  // }

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

const styles = createAdaptStyleSheet.create({
  journeyTitle: {
    width: 96,
    height: 23,
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
  journeyMain: {
    width: 376,
    height: 329,
    marginBottom: 24
  },
  guideTitle: {
    width: 130,
    height: 24,
    resizeMode: 'cover',
    marginLeft: 19,
    marginBottom: 16
  },
});
