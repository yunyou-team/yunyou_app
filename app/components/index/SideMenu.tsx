import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { globalColor } from "@/style/color";
import { createAdaptStyleSheet } from '@/utils/index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = createAdaptStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '60%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuHeader: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontFamily: "MiSans",
    marginBottom: 8,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: "MiSans",
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontFamily: "MiSans",
    marginLeft: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  activeMenuItem: {
    backgroundColor: '#f5f5f5',
  },
  activeMenuText: {
    color: globalColor.THEME_ONE,
  }
});

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose }) => {
  const [activeItem, setActiveItem] = useState('首页');
  const [isRendered, setIsRendered] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 0.8,
          stiffness: 200,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -SCREEN_WIDTH,
          useNativeDriver: true,
          damping: 20, // 阻尼
          mass: 0.8,
          stiffness: 200,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        console.log('触发');
        if (finished) {
          console.log('完成');
          setIsRendered(false);
        }
      });
    }
  }, [isVisible]);

  const handleMenuItemPress = (item: string) => {
    setActiveItem(item);
    // 这里可以添加导航逻辑
  };

  const menuItems = [
    { id: 'home', title: '首页', icon: require('@/assets/images/home/location_icon.png') },
    { id: 'favorite', title: '我的收藏', icon: require('@/assets/images/home/location_icon.png') },
    { id: 'settings', title: '设置', icon: require('@/assets/images/home/location_icon.png') },
    { id: 'about', title: '关于我们', icon: require('@/assets/images/home/location_icon.png') },
  ];

  if (!isRendered) return null;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={{ flex: 1 }} 
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      >
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>云游</Text>
          <Text style={styles.menuSubtitle}>探索更多精彩内容</Text>
        </View>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.menuItem,
              activeItem === item.title && styles.activeMenuItem
            ]}
            onPress={() => handleMenuItemPress(item.title)}
            activeOpacity={0.7}
          >
            <Image 
              source={item.icon} 
              style={[
                styles.menuIcon,
                activeItem === item.title && { tintColor: globalColor.THEME_ONE }
              ]} 
            />
            <Text style={[
              styles.menuText,
              activeItem === item.title && styles.activeMenuText
            ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}; 