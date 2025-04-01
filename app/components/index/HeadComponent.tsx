// HeaderComponent.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import { globalColor } from "@/style/color";
import { createAdaptStyleSheet } from '@/utils/index';

const styles = createAdaptStyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    marginTop: 60,
    marginBottom: 32,
    paddingHorizontal: 19,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: globalColor.THEME_ONE
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    width: 24,
    height: 24
  },
  nameText: {
    marginLeft: 8,
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "MiSans"
  },
  avatarImg: {
    width: 56,
    height: 56,
  }
});

export const renderHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image style={[styles.headerLeft, styles.menu]} source={require('@/assets/images/menu.png')} />
        <Text style={styles.nameText}>Hi, Lily 👋</Text>
      </View>
      <View style={styles.avatar} >
        <Image style={styles.avatarImg} source={require('@/assets/images/home/home_people.png')} />
      </View>
    </View>
  );
};