import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalColor } from '@/style/color';
import Carousel from '@/components/Carousel';

export default function Home() {
    return (
        <View style={styles.viewBg}>
            <LinearGradient
                colors={globalColor.THEME_TWO.color} // 定义颜色数组
                locations={globalColor.THEME_TWO.location} // 渐变位置
                style={styles.viewBg}
            >
                <Carousel />
                <Text style={styles.redColor}>Home</Text>
                <Text style={styles.greenColor}>Home</Text>
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
    },
});
