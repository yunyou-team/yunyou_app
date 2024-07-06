import { Text, View } from "react-native";
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalColor } from '@/style/color'

export default function AiLink() {
  return (
    <View
      style={styles.viewBg}
    >
      <Text>AiLink</Text>
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
