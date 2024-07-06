import { ImageBackground } from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground source={require('../../assets/images/background.png')}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

    </ImageBackground>
  );
}
