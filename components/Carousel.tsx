import Carousel from 'react-native-snap-carousel';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Card = (item: { title: string; text: string }) => {
    return (
        <View
            style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}
        >
            <Text style={{ fontSize: 30 }}>{item.title}</Text>
            <Text>{item.text}</Text>
        </View>
    );
};

const Carousel = () => {
    const [carouselItems, setCarouselItems] = useState([
        {
            title: 'Item 1',
            text: 'Text 1',
        },
        {
            title: 'Item 2',
            text: 'Text 2',
        },
        {
            title: 'Item 3',
            text: 'Text 3',
        },
        {
            title: 'Item 4',
            text: 'Text 4',
        },
        {
            title: 'Item 5',
            text: 'Text 5',
        },
    ]);

    return (
        <Carousel
            data={carouselItems}
            renderItem={Card}
            sliderWidth={300}
            itemWidth={300}
        />
    );
};

export default React.memo(Carousel);
