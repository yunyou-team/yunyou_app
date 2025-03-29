import Carousel from 'react-native-snap-carousel-v4';
import React, { useState } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { createAdaptStyleSheet } from '@/utils';
import { dp2px } from '@/utils/adaptScreen';

const Card = (props: { title: string; text: string; source: string }) => {
    return (
       <View style={{
        borderRadius: 16,
        marginLeft: 19,
        marginRight: 35,
        overflow: 'hidden', 
    }}>
         <ImageBackground
            source={props.source as ImageSourcePropType}
            style={{
                height: 329,
                width:266
            }}
        >
            <Text style={{ fontSize: 30 }}>{props.title}</Text>
            <Text>{props.text}</Text>
        </ImageBackground>
       </View>
    );
};


const TripCarousel = () => {
    const [carouselItems, setCarouselItems] = useState([
        {
            title: 'Item 1',
            text: 'Text 1',
            source: require('@/assets/images/trip_img.png'),
        },
        {
            title: 'Item 2',
            text: 'Text 2',
            source: require('@/assets/images/trip_img.png'),
        },
        {
            title: 'Item 3',
            text: 'Text 3',
            source: require('@/assets/images/trip_img.png'),
        },
    ]);

    return (
        <View style={styles.journeyMain}>
            <Carousel
                layout={'stack'}
                data={carouselItems}
                vertical={false}
                layoutCardOffset={55}
                renderItem={(item) => (
                    <Card
                        title={item.item.title}
                        text={item.item.text}
                        source={item.item.source}
                    />
                )}
                sliderWidth={100}
                itemWidth={dp2px(321)}
            />
        </View>
    );
};


const styles = createAdaptStyleSheet.create({
    journeyMain: {
        marginBottom: 42,
        flexDirection: 'row', 
    },
});

export default React.memo(TripCarousel);
