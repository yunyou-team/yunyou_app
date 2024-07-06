import { Text, View, Image, StyleSheet, TouchableHighlight} from "react-native";

export default function FirstCard({imageSource, buttonText}) {
  const add = (() => {console.log("=====添加=====")})
  return (
    <TouchableHighlight
        onPress={add}
        underlayColor="#DDDDDD"
      >
        <View style={style.card} >
            <View style={style.box}>
              <Image style={style.img}
                  source={imageSource}
                  resizeMode="cover"/>
              <Text style={{fontSize: 14, color: "#C6C6C6" ,fontFamily: "PingFang SC"}}>期待第一条行程</Text>
            </View>
            <Text style={{fontSize: 28, color: "#10D3B1", fontFamily: "MiSans", fontWeight: "bold" ,letterSpacing: 1, margin: 20}}>{buttonText}</Text>
        </View>
      </TouchableHighlight>
  );
}

const style = StyleSheet.create({
    card:{
        width: 376,
        height: 240,
        borderRadius: 16,
        backgroundColor: "#EFFBFB",
        justifyContent: "center",
        alignItems: "center",
        padding: 20, 
    },
    img:{
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    box:{
        justifyContent: "center",
        alignItems: "center",
    }
})
