import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

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

  useEffect(() => {
    getCurrentLocation().then((local) => {
      console.log(local, 'setLocationsetLocationsetLocation');
      local && setLocation(local);
    });
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 39.9042,
        longitude: 116.4074,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={true} // 地图跟随用户位置变化
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
  );
}