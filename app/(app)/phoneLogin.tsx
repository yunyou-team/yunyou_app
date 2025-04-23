import { storage } from '@/utils';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function PhoneLogin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 1500,
            position: 'top',
        });
    };

    const handleGetCode = () => {
        if (!/^\+86 1\d{10}$/.test(phoneNumber)) {
            console.log(phoneNumber, 'phoneNumber');
            showToast('请输入正确的手机号码', 'error');
            return;
        }
        // TODO: 这里添加发送验证码的API调用
        setCountdown(60);
        showToast('验证码已发送');
    };

    const handleLogin = async () => {
        if (!phoneNumber || !verificationCode) {
            showToast('请填写完整信息', 'error');
            return;
        }
        // TODO: 这里添加登录验证的API调用
        await storage.set('cookie', phoneNumber);
        router.push('/(tabs)');
        console.log('登录信息：', { phoneNumber, verificationCode });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { router.back() }}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>手机号登录</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="+86 19822222222"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numbers-and-punctuation" 
                    placeholderTextColor={'rgba(180, 176, 176, 0.6)'}
                />

                <View style={styles.codeContainer}>
                    <TextInput
                        style={[styles.input, styles.codeInput]}
                        placeholder="请输入验证码"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="number-pad"
                        placeholderTextColor={'rgba(180, 176, 176, 0.6)'}
                    />
                    <TouchableOpacity
                        style={[
                            styles.codeButton,
                            countdown > 0 && styles.disabledCodeButton,
                        ]}
                        onPress={handleGetCode}
                        disabled={countdown > 0}
                    >
                        <Text style={styles.codeButtonText}>
                            {countdown > 0 ? `获取验证码(${countdown}s)` : '获取验证码'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>绑定并登录</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        fontSize: 24,
        width: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 40,
    },
    sentNotice: {
        backgroundColor: '#e5ff7f',
        padding: 12,
        marginHorizontal: 16,
        borderRadius: 4,
        marginBottom: 16,
    },
    sentNoticeText: {
        textAlign: 'center',
    },
    inputContainer: {
        padding: 16,
        gap: 16,
    },
    input: {
        height: 48,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        paddingHorizontal: 12,
    },
    codeContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    codeInput: {
        flex: 1,
    },
    codeButton: {
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    disabledCodeButton: {
        opacity: 0.5,
    },
    codeButtonText: {
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#666',
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
