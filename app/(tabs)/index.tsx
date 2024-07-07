import { globalColor } from "@/style/color";
import { Image, ImageBackground, StyleSheet, View, Text } from 'react-native';
import GuideList from '../components/index/GuideList';

export default function HomeScreen() {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/images/menu.png')} />
          <Text style={styles.nameText}>Hi, Lily</Text>
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
      <View style={styles.home}>
        {renderHeader()}
        <Image style={styles.journeyTitle} source={require('@/assets/images/journey-title.png')}></Image>
        <Image style={styles.journeyMain} source={require('@/assets/images/bg-2.png')}></Image>
        <Image style={styles.guideTitle} source={require('@/assets/images/guide-title.png')}></Image>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    marginTop: 60,
    marginBottom: 59,
    paddingHorizontal: 18,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 18,
    backgroundColor: 'pink'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 8,
    fontWeight: 600,
    fontSize: 18
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
});
