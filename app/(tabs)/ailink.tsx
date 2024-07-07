import { ImageBackground, StyleSheet, View } from "react-native";
import Primary from "../../components/Primary";

export default function AiLink() {
  return (
    <ImageBackground source={require('@/assets/images/background.png')} style={styles.container}>
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
