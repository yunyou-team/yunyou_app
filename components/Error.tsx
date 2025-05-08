import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import Icon from "@expo/vector-icons/MaterialIcons";

interface ErrorProps {
  /** 错误信息内容 */
  error: string;
  /** 重试按钮点击事件 */
  onPress: () => void;
  /** 自定义图标名称 */
  iconName?: React.ComponentProps<typeof Icon>["name"];
  /** 自定义图标大小 */
  iconSize?: number;
  /** 自定义图标颜色 */
  iconColor?: string;
  /** 自定义容器样式 */
  containerStyle?: React.ComponentProps<typeof View>["style"];
  /** 自定义错误文本样式 */
  textStyle?: React.ComponentProps<typeof Text>["style"];
  /** 自定义按钮样式 */
  buttonStyle?: React.ComponentProps<typeof TouchableOpacity>["style"];
  /** 自定义按钮文本样式 */
  buttonTextStyle?: React.ComponentProps<typeof Text>["style"];
  /** 重试按钮文本 */
  retryText?: string;
}

const Error: React.FC<ErrorProps> = ({
  error,
  onPress,
  iconName = "error-outline",
  iconSize = dp2px(48),
  iconColor = "#ff4444",
  containerStyle,
  textStyle,
  buttonStyle,
  buttonTextStyle,
  retryText = "重试",
}) => {
  return (
    <View style={[styles.errorContainer, containerStyle]}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={[styles.errorText, textStyle]}>{error}</Text>
      <TouchableOpacity
        style={[styles.retryButton, buttonStyle]}
        onPress={onPress}
      >
        <Text style={[styles.retryText, buttonTextStyle]}>{retryText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = createAdaptStyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#ff4444",
    marginVertical: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryText: {
    color: "#666",
    fontSize: 14,
  },
});

export default Error;
