import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { router, useNavigation } from "expo-router";
import { Text, View } from "react-native";

export default function CreateScreen() {

  const goBack = () => {
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FocusAwareStatusBar />

      <TabBarIcon name="arrow-back" onPress={goBack} />
      <Text>123</Text>
    </View>
  );
}
