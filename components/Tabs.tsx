import { createAdaptStyleSheet } from "@/utils";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Tabs = ({
  tabs,
  activeIndex,
  onChange,
  children,
}: {
  tabs: Array<{ title: string }>;
  activeIndex: number;
  onChange: (index: number) => void;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.tabContainer}>
      {/* Tab 栏 */}
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => onChange(index)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeIndex === index ? styles.activeTabText : {},
              ]}
            >
              {tab.title}
            </Text>
            {activeIndex === index && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        {React.Children.toArray(children)[activeIndex]}
      </View>
    </View>
  );
};

const styles = createAdaptStyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    color: "#999",
    fontSize: 17,
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  tabIndicator: {
    backgroundColor: "#000",
    height: 2,
    width: 20,
    marginTop: 6,
  },
  content: {
    flex: 1,
  },
});
export default Tabs;
