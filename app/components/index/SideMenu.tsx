import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { globalColor } from "@/style/color";
import { createAdaptStyleSheet } from '@/utils/index';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.6;
const GESTURE_AREA_WIDTH = 30;

const springConfig = {
  damping: 20,
  mass: 0.8,
  stiffness: 200,
};

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
    width: MENU_WIDTH,
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
  onOpen: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose, onOpen }) => {
  const [activeItem, setActiveItem] = useState('首页');
  const translateX = useSharedValue(-MENU_WIDTH);
  const context = useSharedValue({ x: 0 });

  useEffect(() => {
    if (isVisible) {
      translateX.value = withSpring(0, springConfig);
    } else {
      translateX.value = withSpring(-MENU_WIDTH, springConfig);
    }
  }, [isVisible]);

  const closeMenu = () => {
    'worklet';
    translateX.value = withSpring(-MENU_WIDTH, springConfig, () => {
      runOnJS(onClose)();
    });
  }

  const openMenu = () => {
    'worklet';
    translateX.value = withSpring(0, springConfig, () => {
      runOnJS(onOpen)();
    });
  }

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      const newTranslateX = context.value.x + event.translationX;
      translateX.value = Math.max(-MENU_WIDTH, Math.min(newTranslateX, 0));
    })
    .onEnd((event) => {
      if (translateX.value < -MENU_WIDTH / 2 || event.velocityX < -500) {
        closeMenu();
      } else {
        openMenu();
      }
    });

  const animatedMenuSyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => {
    const width = isVisible ? SCREEN_WIDTH : GESTURE_AREA_WIDTH;
    return {
      width: withTiming(width, { duration: 150 }),
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-MENU_WIDTH, 0],
      [0, 1],
      Extrapolate.CLAMP
    ),
    display: translateX.value === -MENU_WIDTH ? 'none' : 'flex',
  }));

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

  return (
    <GestureDetector gesture={gesture}>
      <Reanimated.View style={[styles.container, animatedContainerStyle]}>
        <Reanimated.View
          style={[
            styles.overlay,
            animatedOverlayStyle
          ]}
        >
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={() => closeMenu()}
            activeOpacity={1}
          />
        </Reanimated.View>
        <Reanimated.View
          style={[
            styles.menuContainer,
            animatedMenuSyle
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
        </Reanimated.View>
      </Reanimated.View>
    </GestureDetector>
  );
}; 