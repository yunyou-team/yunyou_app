import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createAdaptStyleSheet } from '@/utils';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { useState, useEffect } from 'react';

interface FirstLoginProps {
  onComplete?: () => void;
}

export default function FirstLogin({ onComplete }: FirstLoginProps) {

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/login/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.logoText}>云 游</Text>
        <Text style={styles.logoTextEn}>YUN TRAVEL</Text>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
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
});
