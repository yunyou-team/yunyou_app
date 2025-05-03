import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  SafeAreaView,
  StatusBarStyle,
  ViewStyle,
} from "react-native";
import { useWindowDimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createAdaptStyleSheet } from "@/utils";

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
  /** 返回按钮点击事件 */
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
  // 状态栏高度（Android特有处理）
  const statusBarHeight = Platform.select({
    android: translucent ? RNStatusBar.currentHeight : 0,
    ios: 0,
  });

  return (
    <>
      {/* 系统状态栏 */}
      <RNStatusBar
        backgroundColor={translucent ? "transparent" : backgroundColor}
        barStyle={barStyle}
        hidden={hidden}
        translucent={translucent}
      />

      {/* Android透明状态栏占位 */}
      {Platform.OS === "android" && translucent && (
        <View style={[styles.placeholder, { height: statusBarHeight }]} />
      )}

      {/* 导航栏主体 */}
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
            <AntDesign
              name="left"
              size={24}
              color={barStyle === "dark-content" ? "#000" : "#FFF"}
              onPress={onBackPress}
              style={styles.backButton}
            />
          )}

          {/* 标题区域 */}
          <Text
            style={[
              styles.title,
              { color: barStyle === "dark-content" ? "#000" : "#FFF" },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          {/* 右侧自定义内容 */}
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
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#CCCCCC",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
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
