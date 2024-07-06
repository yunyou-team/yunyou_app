import FirstCard from "@/components/firstLogin/firstCard";
import { View } from "react-native";

export default function Primary() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 32 }}>
        <FirstCard
          imageSource={require('@/assets/images/createTravel.png')}
          buttonText="+ 创建行程"
        />
      </View>
      <View>
        <FirstCard
          imageSource={require('@/assets/images/createAI.png')}
          buttonText="+ AI解析"
        />
      </View>
    </View>
  );
}
