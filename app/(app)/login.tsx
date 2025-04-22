import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { createAdaptStyleSheet, storage } from '@/utils';

export default function Login() {
  const [isAgreed, setIsAgreed] = useState(false);

  const handlePhoneLogin = () => {
    router.push('/phoneLogin');
  };

  const handleAppleLogin = async () => {
    await storage.set('cookie', '17879328848');
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Logo 区域 */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/login/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.logoText}>云 游</Text>
        <Text style={styles.logoTextEn}>YUN TRAVEL</Text>
      </View>

      {/* 登录按钮区域 */}
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.wechatButton} onPress={() => {}}>
          {/* <Image 
            source={require('@/assets/images/wechat.png')} 
            style={styles.buttonIcon}
          /> */}
          <Text style={styles.wechatButtonText}>微信登录</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.phoneButton} onPress={handlePhoneLogin}>
          {/* <Image 
            source={require('@/assets/images/phone.png')} 
            style={styles.buttonIcon}
          /> */}
          <Text style={styles.phoneButtonText}>手机号登录</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton} onPress={handleAppleLogin}>
          {/* <Image 
            source={require('@/assets/images/apple.png')} 
            style={styles.buttonIcon}
          /> */}
          <Text style={styles.appleButtonText}>通过 Apple 登陆</Text>
        </TouchableOpacity>
      </View>

      {/* 底部协议区域 */}
      <View style={styles.agreementContainer}>
        <TouchableOpacity 
          style={styles.checkbox} 
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <View style={[styles.checkboxInner, isAgreed && styles.checkboxChecked]} />
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          已阅读并同意 云游 的
          <Link href="/(app)/create" style={styles.linkText}>服务协议</Link>
          和
          <Link href="/(app)/create" style={styles.linkText}>隐私政策</Link>
        </Text>
      </View>
    </View>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 48,
    paddingTop: 146,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  logoTextEn: {
    fontSize: 16,
    color: '#666',
  },
  loginContainer: {
    marginTop: 170,
    gap: 20,
  },
  wechatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 46,
    borderRadius: 8,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: 46,
    borderRadius: 8,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: 46,
    borderRadius: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  wechatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  phoneButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  appleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    padding: 2,
  },
  checkboxInner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  checkboxChecked: {
    backgroundColor: '#275b51',
  },
  agreementText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: '#275b51',
    textDecorationLine: 'underline',
  },
});
