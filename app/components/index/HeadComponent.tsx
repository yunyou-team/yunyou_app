import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { globalColor } from "@/style/color";
import { createAdaptStyleSheet, storage } from '@/utils/index';
import { SideMenu } from './SideMenu';

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

export const HeadComponent: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClickPerson = async () => {
    console.log('跳转个人主页');
    await storage.remove('cookie')
  }

  const handleMenuClick = () => {
    setIsMenuVisible(true);
  }

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleMenuClick}>
            <Image style={[styles.headerLeft, styles.menu]} source={require('@/assets/images/menu.png')} />
          </TouchableOpacity>
          <Text style={styles.nameText}>Hi, Lily 👋</Text>
        </View>
        <TouchableOpacity onPress={handleClickPerson}>
          <View style={styles.avatar} >
            <Image style={styles.avatarImg} source={require('@/assets/images/home/home_people.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <SideMenu isVisible={isMenuVisible} onClose={handleCloseMenu} />
    </>
  );
};