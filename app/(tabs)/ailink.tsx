import { ImageBackground, StyleSheet, View } from "react-native";
import Primary from "../../components/Primary";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";

export default function AiLink() {
  return (
    <ImageBackground source={require('@/assets/images/background.png')} style={styles.container}>
      <FocusAwareStatusBar />
      <Primary />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
