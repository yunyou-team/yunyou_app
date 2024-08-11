import { StoryListItemHeight } from '@/components/StoryListItem'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const StoryList = [
  { id: 1, img: require('../assets/stories/1.jpg') },
  { id: 2, img: require('../assets/stories/2.jpg') },
  { id: 3, img: require('../assets/stories/3.jpg') },
  { id: 4, img: require('../assets/stories/4.jpg') },
]

const Index = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <View
        style={{
          height: StoryListItemHeight,
          width: '100%',
          backgroundColor: 'pink'
        }}
      >
        <ScrollView horizontal>
          <View style={{}}>
            <View style={{
              position: 'absolute',
              width: 100,
              height: 100,
              backgroundColor: 'yellow',
              // zIndex: 1000,
              top: 0,
              left: 0,
            }}></View>
          </View>
          {/* {StoryList.map((story) => {
            return <StoryListItem key={story.id} img={story.img} />
          })} */}
        </ScrollView>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3044',
  }
})

export default Index
