import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Linking, TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
import { globalColor } from '@/style/color';


async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('位置权限被拒绝');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log(location);
  return location;
}

// 定义 Region 接口来描述 region 状态的结构
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function CreateScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // 使用 useState 钩子来管理输入框的值
  const [inputValue, setInputValue] = useState('');

  // 处理输入变化的函数
  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  // 处理提交输入的函数，例如通过按钮点击
  const handleSubmit = () => {
    console.log('输入的内容是:', inputValue);
    // 在此处可以添加提交输入内容的逻辑
  };

  const openMap = (latitude: any, longitude: any, name: string) => {
    const url = `http://maps.apple.com/?q=${latitude},${longitude}&sll=${latitude},${longitude}&z=16`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('无法打开地图应用');
      }
    });
  };

  const openMapFormName = () => {
    const encodedAddress = encodeURIComponent(inputValue);
    const url = `maps://?q=${encodedAddress}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('无法打开地图应用');
      }
    });
  }

  useEffect(() => {
    getCurrentLocation().then((local) => {
      console.log(local, 'setLocationsetLocationsetLocation');
      local && setLocation(local);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
      style={{ flex: 1,width: '100%' }}
      initialRegion={{
        latitude: 39.9042,
        longitude: 116.4074,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={false} // 地图跟随用户位置变化
      mapType="standard" // 标准地图类型
    >
      {location && (
        <Marker
          coordinate={{
            latitude: 39.909,
            longitude: 116.3975,
          }}
          title="当前位置"
        />
      )}
     
      
    </MapView>
    <TextInput
        style={styles.button}
        placeholder="输入一些文本..."
        value={inputValue} // 控制输入框的值
        onChangeText={handleInputChange} // 处理输入变化
        onSubmitEditing={handleSubmit} // 处理提交事件
      />
      <TouchableOpacity style={[styles.button, {top: 270}]} onPress={() => openMapFormName()}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </View>
    
  );
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    flex: 1,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: globalColor.THEME_ONE, // 按钮背景色
    borderRadius: 5, // 按钮圆角
    position: 'absolute', // 使用绝对定位
    right: 10, // 从右侧开始定位
    top: 180, // 从底部开始定位
    zIndex: 1000, // 确保按钮在最上层
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // 文字颜色
    fontSize: 16, // 文字大小
    textAlign: 'center', // 文字居中
  },
});