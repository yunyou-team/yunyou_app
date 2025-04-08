import Carousel from 'react-native-snap-carousel-v4';
import React, { useState, useRef } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View, Image, TouchableOpacity } from 'react-native';
import { createAdaptStyleSheet } from '@/utils';
import { dp2px } from '@/utils/adaptScreen';
import { globalColor } from '@/style/color';
import { router } from 'expo-router';

interface TripItem {
    title: string;
    location: string;
    source: any;
    avatars: string[];
    isCreateCard?: boolean;
}

interface CreateTripItem {
    title: string;
    source: null;
    isCreateCard: boolean;
}

type CarouselItem = TripItem | CreateTripItem;

interface CardProps {
    title: string;
    location?: string;
    source: string | null;
    avatars?: string[];
    isCreateCard?: boolean;
    onPress?: () => void;
}

const CreateTripCard = ({ onPress }: { onPress?: () => void }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.createCard}>
                <Text style={styles.createCardText}>创建行程</Text>
            </View>
        </TouchableOpacity>
    );
};

const Card = (props: CardProps) => {
    if (props.isCreateCard) {
        return <CreateTripCard onPress={props.onPress} />;
    }

    return (
       <View style={styles.card}>
         <ImageBackground
            source={props.source as ImageSourcePropType}
            style={styles.cardBackground}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.contentContainer}>
                <View style={styles.topContent}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={styles.bottomContent}>
                    <View style={styles.locationContainer}>
                        <Image 
                            source={require('@/assets/images/home/location_icon.png')} 
                            style={styles.locationIcon}
                        />
                        <Text style={styles.locationText}>{props.location}</Text>
                    </View>
                    <View style={styles.avatarsContainer}>
                        {props.avatars?.map((avatar, index) => (
                            <Image
                                key={index}
                                source={{ uri: avatar }}
                                style={[
                                    styles.avatar,
                                    { 
                                        marginLeft: index > 0 ? -12 : 0,
                                        zIndex: (props.avatars?.length || 0) - index
                                    }
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </ImageBackground>
       </View>
    );
};

const TripCarousel = () => {
    const [carouselItems] = useState<TripItem[]>([
        {
            title: '五一泰国行',
            location: '曼谷',
            source: require('@/assets/images/home/trip_img_1.png'),
            avatars: [
                'https://pica.zhimg.com/v2-22cf461858198227392b899b96d8e9cb_720w.jpg?source=172ae18b',
                'https://bpic.588ku.com/element_pic/23/07/19/a2b3deece0e707d0eae5ccb5f8c75f84.jpg!/fw/350/quality/99/unsharp/true/compress/true',
                'https://cdn.pixabay.com/photo/2024/01/29/20/40/cat-8540772_640.jpg'
            ],
        },
        {
            title: '端午香港行',
            location: '香港',
            source: require('@/assets/images/home/trip_img_2.png'),
            avatars: [
                'https://pica.zhimg.com/v2-22cf461858198227392b899b96d8e9cb_720w.jpg?source=172ae18b',
            ],
        },
    ]);

    const carouselRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleIndexChanged = (index: number) => {
        setActiveIndex(index);
    };

    const handleCreateTrip = () => {
        router.push('/create');
    };

    const displayItems: CarouselItem[] = [
        ...carouselItems,
        ...(carouselItems.length < 3 ? [{
            title: '',
            source: null,
            isCreateCard: true
        }] : [])
    ];

    return (
        <View style={styles.journeyMain}>
            <Carousel
                ref={carouselRef}
                layout={'stack'}
                data={displayItems}
                vertical={false}
                layoutCardOffset={55}
                onScrollIndexChanged={handleIndexChanged}
                renderItem={({item, index}) => (
                    <Card
                        title={item.title}
                        location={'location' in item ? item.location : undefined}
                        source={item.source}
                        avatars={'avatars' in item ? item.avatars : undefined}
                        isCreateCard={item.isCreateCard}
                        onPress={handleCreateTrip}
                    />
                )}
                sliderWidth={100}
                itemWidth={dp2px(321)}
            />
            {activeIndex === displayItems.length - 1 && (
                <View style={[styles.hintContainer, { right: dp2px(5) }]}>
                    <Text style={styles.hintText}>进入我的行程</Text>
                </View>
            )}
        </View>
    );
};


const styles = createAdaptStyleSheet.create({
    journeyMain: {
        marginBottom: 42,
        flexDirection: 'row',
        position: 'relative',
    },
    card: {
        borderRadius: 16,
        marginLeft: 19,
        marginRight: 35,
        overflow: 'hidden',
        height: 329,
        width: 266,
    },
    cardBackground: {
        flex: 1,
    },
    backgroundImage: {
        borderRadius: 16,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topContent: {
        padding: 16,
    },
    bottomContent: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    avatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    createCard: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    createCardText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666666',
    },
    createCardOverlay: {
        position: 'absolute',
        right: -dp2px(321),
        top: 0,
    },
    hintContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -15 }],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E5F3FF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    hintText: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '500',
    },
});

export default React.memo(TripCarousel);
