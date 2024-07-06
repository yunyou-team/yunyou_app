import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { globalColor } from '@/style/color'

export default function Home() {
  return (
    <View
      style={styles.viewBg}
    >
      <LinearGradient
        colors={globalColor.THEME_TWO.color} // 定义颜色数组
        locations={globalColor.THEME_TWO.location} // 渐变位置
        style={styles.viewBg}
      >
        <Text style={styles.redColor}>Home</Text>
        <Text style={styles.greenColor}>Home</Text>
        <ActivityIndicator color={globalColor.FONT_ONE} animating={true}></ActivityIndicator>
      </LinearGradient>
    </View>
  );
}


const styles = StyleSheet.create({
  redColor: {
    color: globalColor.FONT_ONE,
  },
  greenColor: {
    color: globalColor.FONT_TWO,
  },
  viewBg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
});
