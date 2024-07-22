import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalColor } from '@/style/color';
import Primary from '../../components/Primary';
import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar';

export default function AiLink() {
    return (
        <ImageBackground
            source={require('@/assets/images/background.png')}
            style={styles.container}
        >
            <FocusAwareStatusBar />
            <Primary />
        </ImageBackground>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
