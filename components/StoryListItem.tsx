import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet, View } from 'react-native';

export const StoryListItemWidth = Dimensions.get('window').width * 0.8;
export const StoryListItemHeight = (StoryListItemWidth / 3) * 4;

interface StoryListItemProps {
  img: ImageSource;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ img }) => {
  return (
    <View style={{
      height: 200,
      backgroundColor: 'red',
      // position: 'relative'
    }}>
      {/* <Image
        source={img}
        style={{
          position: 'absolute',
          width: StoryListItemWidth,
          height: StoryListItemHeight,
          borderRadius: 25
        }}
      /> */}
    </View>
  )
}

export default StoryListItem

const styles = StyleSheet.create({
  container: {
    height: StoryListItemHeight,
    width: StoryListItemWidth,
  }
})
