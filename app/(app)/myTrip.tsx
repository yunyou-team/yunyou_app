import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAdaptStyleSheet } from '@/utils';
import { dp2px } from '@/utils/adaptScreen';

export default function MyTrip() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>我的行程</Text>
        </View>
    );
}

const styles = createAdaptStyleSheet.create({
    container: {
        flex: 1,
        padding: dp2px(16),
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: dp2px(20),
        fontWeight: '600',
        color: '#333333',
        marginBottom: dp2px(16),
    },
}); 