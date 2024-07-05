import FirstCard from "@/components/firstLogin/firstCard";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
      }}
    >
      <View style={{ marginBottom: 15 }}>
        <FirstCard
          imageSource={require('../../assets/images/createTravel.png')}
          buttonText="+ 创建行程"
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <FirstCard
          imageSource={require('../../assets/images/createAI.png')}
          buttonText="+ AI解析"
        />
      </View>
    </View>
  );
}
