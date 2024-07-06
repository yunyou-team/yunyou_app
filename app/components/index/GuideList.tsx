import { globalColor } from '@/style/color';
import React, { useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Image, NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { router } from 'expo-router';
import { globalScreen } from '@/style/layout';

// 定义卡片组件
const Card = ({ item }: { item: any }) => {
    return (
        <View style={styles.card}>
            {/* 左边内容 */}
            <Image source={{ uri: item.img }} style={styles.cardImg}></Image>
            {/* 右边内容 */}
            <View style={styles.cardRight}>
                <Text numberOfLines={4} style={styles.cardText} ellipsizeMode={'tail'}>{item.title}</Text>
                {/* 账号信息 */}
                <View style={styles.accountInfo}>
                    <Image source={require('@/assets/images/headerImg.png')} style={styles.headerImg}></Image>
                    <View>
                        <Text style={styles.accountName}>{item.name}</Text>
                        <Text style={styles.accountName}>{item.time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

// 主组件
export default function CardsFlatListHorizontal() {
    const [showFooterImage, setShowFooterImage] = useState(false);
    // const [opacity, setOpacity] = useState(1);
    const flatListRef = useRef<any>(null);
    const flatListWidth = useRef<number>(0);
    const lastWidth = useRef<number>(10000);
    // const opacity = useRef<number>(1);

    console.log('执行---');

    // 数据源
    const data = [
        { id: '1', title: '第一次来泰国怎么玩？一篇教会你7天6晚玩转曼谷+普吉岛！', name: '云游官方账号', time: '05.02', img: 'https://www.kkday.com/zh-my/blog/wp-content/uploads/%E6%97%A5%E6%9C%AC%E4%B8%9C%E4%BA%ACTokyo%E6%97%85%E6%B8%B8%E6%94%BB%E7%95%A50.jpg' },
        { id: '2', title: '第一次来泰国怎么玩？一篇教会你7天6晚玩转曼谷+普吉岛！', name: '云游官方账号', time: '05.02', img: 'https://www.agoda.com/wp-content/uploads/2019/01/Things-to-do-in-Tokyo-Tokyo-Tower.jpg' },
        { id: '3', title: '第一次来泰国怎么玩？一篇教会你7天6晚玩转曼谷+普吉岛！', name: '云游官方账号', time: '05.02', img: 'https://www.snowmonkeyresorts.com/wp-content/uploads/2020/10/3932697_m.jpg' },
        // ... 更多卡片数据
    ];

    // 处理滚动事件
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { x } = event.nativeEvent.contentOffset;


        // 判断是否滚动到末尾并继续拉动了80px
        if (x > lastWidth.current - 10 && x < lastWidth.current ) {
            // setOpacity(0)
            setShowFooterImage(false);
            console.log('小于 <', x, lastWidth.current - 80,lastWidth.current ); 
        } else if (x > flatListWidth.current - globalScreen.width + 80 ) {
            lastWidth.current = flatListWidth.current - globalScreen.width + 80 
            setShowFooterImage(true);
            // setOpacity(1)
            console.log('翻页',x, lastWidth.current); 
        }
    };

    const handleTouchEnd = () => {
        console.log('松手+++++');
        setShowFooterImage(false);
       
        // 当松手时
        if (showFooterImage ) {
            console.log('番茄------------');
            // 隐藏图片
            router.push('./create')
            setShowFooterImage(false);
            // setOpacity(1)
        }
    };

    const onContentSizeChange = (width: number) => {
        // width 参数是 FlatList 的内容宽度
        console.log(width,'width');
        flatListWidth.current = width;

      };

    return (
        <View style={styles.container}>
            {/* 卡片列表 */}
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={item => item.id}
                horizontal={true} // 设置为水平滚动
                contentContainerStyle={styles.contentContainer}
                showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
                style={{ flexGrow: 0 }}
                onScroll={handleScroll} // 添加滚动事件处理
                // onLayout={onLayoutHandler} // 添加 onLayout 事件处理器
                onTouchEnd={handleTouchEnd}
                onContentSizeChange={onContentSizeChange}
            ListFooterComponent={() => (
                showFooterImage && (<Image
                    style={[styles.moreImage]}
                    source={require('@/assets/images/guide-more.png')} // 替换为你的图片路径
                />
            ))}
            />
            {/* {
                showFooterImage && (<Image
                    style={styles.moreImage}
                    source={require('@/assets/images/guide-more.png')} // 替换为你的图片路径
                />)
            } */}
        </View>
    );
}

// 样式定义
const styles = StyleSheet.create({
    container: {
        // marginTop: 200,
        flexGrow: 0,
        flexDirection: 'row', // 设置为行内布局
        justifyContent: 'flex-start', // 子元素在主轴（这里是水平轴）上的起始位
    },
    card: {
        width: 266,
        height: 132,
        borderRadius: 16,
        padding: 4,
        backgroundColor: 'white',
        marginRight: 16,
        flexDirection: 'row', // 设置为行内布局
        justifyContent: 'flex-start', // 子元素在主轴（这里是水平轴）上的起始位
    },
    cardRight: {
        paddingTop: 8,    // 上内边距为 8
        paddingBottom: 4,  // 下内边距为 0
        paddingLeft: 12,   // 左内边距为 12
        paddingRight: 8,   // 右内边距为 8
    },
    cardText: {
        fontSize: 14,
        lineHeight: 20, // 根据实际行高调整
        width: 122,
        color: globalColor.FONT_ONE,
        marginBottom: 16
    },
    contentContainer: {
        paddingLeft: 10, // 内容容器的左边距
    },
    cardImg: {
        width: 124,
        height: 124,
        borderRadius: 16,
        resizeMode: 'cover'
    },
    accountInfo: {
        flexDirection: 'row', // 设置为行内布局
    },
    headerImg: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 4
    },
    accountName: {
        fontSize: 8,
        lineHeight: 10,
        color: globalColor.FONT_TWO,
    },
    moreImage: {
        width: 116,
        height: 132,
        marginRight: 19,
    }
});