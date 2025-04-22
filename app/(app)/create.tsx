import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { fetchExampleInfo } from '@/services';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function CreateScreen() {
    const [info, setInfo] = useState('请求中...');
    useEffect(() => {
        fetchExampleInfo().then((res) => {
            setInfo(res.info);
        });
    },[]);

    const goBack = () => {
        router.back();
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FocusAwareStatusBar />

            <TabBarIcon name='arrow-back' onPress={goBack} />
            <Text>{info}</Text>
        </View>
    );
}
