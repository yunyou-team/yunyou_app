import FirstCard from "@/components/firstLogin/firstCard";
import { ImageBackground, View } from "react-native";
import { renderHeader } from "@/app/components/index/HeadComponent";

export default function Primary() {
  return (
    <ImageBackground source={require('@/assets/images/home/home_bg.png')}
      style={{
        flex: 1,
      }}>
      {renderHeader()}
      <View style={{ margin: 19 }}>
        <FirstCard
          imageSource={require('@/assets/images/createTravel.png')}
          mainText="快捷创建"
          routerSource="login"
          subText="简易流程、好友共建"
          buttonText="创建行程"
          imageStyle={{ width: 250, height: 250, resizeMode: 'contain' , marginTop: 120, marginLeft: 25}}
        />
      </View>
      <View style={{ margin: 19 }}>
        <FirstCard
          imageSource={require('@/assets/images/createAI.png')}
          mainText="智能创建"
          routerSource="login"
          subText="AI链接解析、AI一键生成"
          buttonText="AI解析"
          imageStyle={{ width: 250, height: 250, resizeMode: 'contain', marginTop: 120, marginRight: 20}}
        />
      </View>
    </ImageBackground>
  );
}
