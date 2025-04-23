import { globalColor } from "@/style/color";
import { LinearGradient } from "expo-linear-gradient";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { Image, ImageBackground, Text, View } from 'react-native';
import GuideList from '../components/index/GuideList';
import { createAdaptStyleSheet, storage } from '@/utils/index'
import MyDrawerComponent from "../components/index/Menu";
import { HeadComponent } from "../components/index/HeadComponent";
import Primary from "@/components/Primary";
import { useEffect, useState } from "react";
import TripCarousel from "../components/index/TripCarousel";
import { router } from "expo-router";

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const isLogin = async () => {
      const isLoginStatus = await storage.get('cookie')
      setIsLogin(!!isLoginStatus)
    }
    isLogin()
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('@/assets/images/home/home_bg.png')}
        style={{
          flex: 1,
        }}>
        <FocusAwareStatusBar />
        <HeadComponent></HeadComponent>
        <Image style={styles.journeyTitle} source={require('@/assets/images/journey-title.png')}></Image>
        <TripCarousel />
        <Image style={styles.guideTitle} source={require('@/assets/images/guide-title.png')}></Image>
        <GuideList></GuideList>
        {/* <MyDrawerComponent></MyDrawerComponent> */}
      </ImageBackground>
    </View>
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
