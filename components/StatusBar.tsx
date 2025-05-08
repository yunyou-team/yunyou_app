import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  SafeAreaView,
  StatusBarStyle,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createAdaptStyleSheet } from "@/utils";
import { router } from "expo-router";

type StatusBarProps = {
  /** 状态栏背景色（Android/iOS） */
  backgroundColor?: string;
  /** 状态栏文字风格 */
  barStyle?: StatusBarStyle;
  /** 是否隐藏状态栏 */
  hidden?: boolean;
  /** Android透明状态栏模式 */
  translucent?: boolean;
  /** 自定义右侧内容 */
  children?: React.ReactNode;
  /** 标题文字 */
  title: string;
  /** 是否显示返回图标 */
  showBack?: boolean;
  /** 返回按钮点击事件（默认使用导航返回） */
  onBackPress?: () => void;
};

const StatusBar = ({
  backgroundColor = "#FFFFFF",
  barStyle = "dark-content",
  hidden = false,
  translucent = false,
  title = "",
  children,
  showBack = true,
  onBackPress,
}: StatusBarProps) => {
  const statusBarHeight = Platform.select({
    android: translucent ? RNStatusBar.currentHeight : 0,
    ios: 0,
  });

  // 处理返回逻辑
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.back) {
      router.back();
    }
  };

  return (
    <>
      <RNStatusBar
        backgroundColor={translucent ? "transparent" : backgroundColor}
        barStyle={barStyle}
        hidden={hidden}
        translucent={translucent}
      />

      {Platform.OS === "android" && translucent && (
        <View style={[styles.placeholder, { height: statusBarHeight }]} />
      )}

      <SafeAreaView
        style={[
          styles.navBar,
          { backgroundColor },
          Platform.OS === "android" && { paddingTop: statusBarHeight },
        ]}
      >
        <View style={styles.content}>
          {/* 左侧返回按钮 */}
          {showBack && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBack}
              style={styles.backButton}
            >
              <AntDesign
                name="left"
                size={24}
                color={barStyle === "dark-content" ? "#000" : "#FFF"}
              />
            </TouchableOpacity>
          )}

          {/* 标题容器 */}
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                { color: barStyle === "dark-content" ? "#000" : "#FFF" },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* 右侧内容 */}
          <View style={styles.rightContent}>{children}</View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = createAdaptStyleSheet.create({
  navBar: {
    flexDirection: "row",
    height: Platform.select({
      ios: 44,
      android: 56,
    }),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  titleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1, // 确保点击穿透
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    maxWidth: "70%", // 防止过长标题溢出
  },
  backButton: {
    padding: 8,
    zIndex: 1, // 确保按钮可点击
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 999,
  },
});

export default StatusBar;
