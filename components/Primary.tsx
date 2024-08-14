import FirstCard from "@/components/firstLogin/firstCard";
import { ImageBackground, View } from "react-native";
import { renderHeader } from "@/app/components/index/HeadComponent";

export default function Primary() {
  return (
    <ImageBackground source={require('@/assets/images/background.png')}
      style={{
        flex: 1,
      }}>
      {renderHeader()}
      <View style={{ marginBottom: 15 }}>
        <FirstCard
          imageSource={require('@/assets/images/createTravel.png')}
          mainText="快捷创建"
          routerSource="create"
          subText="简易流程、好友共建"
          buttonText="智能创建"
          imageStyle={{ width: 250, height: 250, resizeMode: 'contain' , marginTop: 120, marginLeft: 25}}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <FirstCard
          imageSource={require('@/assets/images/createAI.png')}
          mainText="智能创建"
          routerSource="./ailink"
          subText="AI链接解析、AI一键生成"
          buttonText="AI解析"
          imageStyle={{ width: 250, height: 250, resizeMode: 'contain', marginTop: 120, marginRight: 20}}
        />
      </View>
    </ImageBackground>
  );
}
