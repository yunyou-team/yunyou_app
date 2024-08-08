import Carousel from 'react-native-snap-carousel-v4';
import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';

const Card = (props: { title: string; text: string; source: string }) => {
    return (
        <ImageBackground
            source={props.source}
            style={{
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}
        >
            <Text style={{ fontSize: 30 }}>{props.title}</Text>
            <Text>{props.text}</Text>
        </ImageBackground>
    );
};

const extraCarouselItem = {
    title: 'Item 4',
    text: 'Text 4',
};

const TripCarousel = () => {
    const [carouselItems, setCarouselItems] = useState([
        {
            title: 'Item 1',
            text: 'Text 1',
            source: require('@/assets/images/bg-2.png'),
        },
        {
            title: 'Item 2',
            text: 'Text 2',
            source: require('@/assets/images/bg-2.png'),
        },
        {
            title: 'Item 3',
            text: 'Text 3',
            source: require('@/assets/images/bg-2.png'),
        },
    ]);

    return (
        <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
            <Carousel
                layout={'default'}
                data={carouselItems}
                renderItem={(item) => (
                    <Card
                        title={item.item.title}
                        text={item.item.text}
                        source={item.item.source}
                    />
                )}
                sliderWidth={100}
                itemWidth={250}
                
            />
        </View>
    );
};

export default React.memo(TripCarousel);
