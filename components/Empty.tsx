import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { dp2px } from "@/utils/adaptScreen";
import Icon from "@expo/vector-icons/MaterialIcons";

interface EmptyStateProps {
  /** 图标名称 */
  iconName: React.ComponentProps<typeof Icon>["name"];
  /** 提示文本 */
  text: string;
  /** 自定义容器样式 */
  containerStyle?: React.ComponentProps<typeof View>["style"];
  /** 自定义文本样式 */
  textStyle?: React.ComponentProps<typeof Text>["style"];
  /** 自定义图标大小 */
  iconSize?: number;
  /** 自定义图标颜色 */
  iconColor?: string;
}

const Empty: React.FC<EmptyStateProps> = ({
  iconName = "info",
  text,
  containerStyle,
  textStyle,
  iconSize = dp2px(48),
  iconColor = "#ccc",
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  text: {
    fontSize: 14,
    color: "#999",
    marginTop: 16,
  },
});

export default Empty;
