
/**
 * 全局颜色系统
 */
export const globalColor = {
    /** 字体系统 */
    FONT_ONE: '#222222',
    FONT_TWO: '#9C9C9C',
    FONT_THREE: '#C6C6C6',


    /** 主题色 */
    THEME_ONE: '#10D3B1',
    THEME_TWO: {
        color: ['#49E1C4', '#10D3B1'],
        location: [0.1389, 0.8805]
    },
}


// 使用示例

// <LinearGradient
//     colors={globalColor.THEME_TWO.color} // 定义颜色数组
//     locations={globalColor.THEME_TWO.location} // 渐变位置
//     style={styles.viewBg}
// >
// </LinearGradient>

// const styles = StyleSheet.create({
//     redColor: {
//         color: globalColor.FONT_ONE,
//     },
//     greenColor: {
//         color: globalColor.FONT_TWO,
//     }
// });
  
