import React, { ReactNode, useRef, useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native'
import { createAdaptStyleSheet } from '@/utils/index'
import CloseIcon from '@/components/icons/CloseIcon'
import { globalColor } from '@/style/color'

// 获取屏幕尺寸
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

// 定义弹窗高度的锚点（屏幕高度的百分比）
const SNAP_POINTS = [0.9, 0.7, 0.3] // 90%, 70%, 30%

// 组件属性类型定义
interface BottomPopupProps {
  visible: boolean // 控制弹窗显示/隐藏
  onClose: () => void // 关闭弹窗的回调函数
  children?: ReactNode // 弹窗内容
  leftSlot?: ReactNode // 头部左侧插槽
  titleSlot?: ReactNode // 头部中间插槽
  rightSlot?: ReactNode // 头部右侧插槽
  headerSlot?: ReactNode // 完全自定义头部
  imageUrl?: string // 图片URL（如果需要显示图片）
}

/**
 * 底部弹出窗口组件
 * 支持拖拽调整高度，自动吸附到预设高度点
 * 可通过拖拽或关闭按钮关闭
 */
export const BottomPopup = ({
  visible,
  onClose,
  children,
  leftSlot,
  titleSlot,
  rightSlot,
  headerSlot,
  imageUrl,
}: BottomPopupProps) => {
  // 弹窗高度动画值，默认为屏幕高度的70%
  const heightAnim = useRef(new Animated.Value(SCREEN_HEIGHT * 0.7)).current
  // 拖动时的临时位移动画值
  const translateY = useRef(new Animated.Value(0)).current
  // 记录拖动开始时的位置
  const dragStartY = useRef(0)

  // 用于追踪当前弹窗高度
  const [currentHeight, setCurrentHeight] = useState(SCREEN_HEIGHT * 0.7)

  // 监听高度动画值变化
  useEffect(() => {
    const listener = heightAnim.addListener(({ value }) => {
      setCurrentHeight(value)
    })
    return () => {
      heightAnim.removeListener(listener)
    }
  }, [])

  // 弹窗关闭时重置状态
  useEffect(() => {
    if (!visible) {
      heightAnim.setValue(SCREEN_HEIGHT * 0.7)
      translateY.setValue(0)
    }
  }, [visible])

  /**
   * 找到最接近的锚点高度
   * @param height 当前高度
   * @returns 最近的锚点高度
   */
  const findNearestSnapHeight = (height: number) => {
    const points = SNAP_POINTS.map((point) => SCREEN_HEIGHT * point)
    let nearest = points[0]
    let minDistance = Math.abs(height - points[0])
    for (const point of points) {
      const distance = Math.abs(height - point)
      if (distance < minDistance) {
        minDistance = distance
        nearest = point
      }
    }
    return nearest
  }

  // 手势响应处理
  const panResponder = useRef(
    PanResponder.create({
      // 是否响应手势
      onStartShouldSetPanResponder: () => true,

      // 手势开始时的处理
      onPanResponderGrant: () => {
        dragStartY.current = 0
        translateY.setValue(0)
      },

      // 手势移动时的处理
      onPanResponderMove: (_, gestureState) => {
        // 计算新的位移值
        let newTranslateY = gestureState.dy

        // 限制向上拖动，不超过屏幕高度
        if (currentHeight - newTranslateY > SCREEN_HEIGHT) {
          newTranslateY = currentHeight - SCREEN_HEIGHT
        }

        // 限制向下拖动，不小于0
        if (currentHeight - newTranslateY < 0) {
          newTranslateY = currentHeight
        }

        // 更新位移动画值
        translateY.setValue(newTranslateY)
      },

      // 手势释放时的处理
      onPanResponderRelease: (_, gestureState) => {
        // 计算新的弹窗高度
        let newHeight = currentHeight - gestureState.dy

        // 限制高度范围
        if (newHeight > SCREEN_HEIGHT) newHeight = SCREEN_HEIGHT
        if (newHeight < 0) newHeight = 0

        // 找到最近的锚点高度
        const snapHeight = findNearestSnapHeight(newHeight)

        // 同时执行高度和位移的动画
        Animated.parallel([
          // 弹窗高度动画
          Animated.spring(heightAnim, {
            toValue: snapHeight,
            useNativeDriver: false,
            damping: 50,
            stiffness: 300,
          }),
          // 位移重置动画
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
            damping: 50,
            stiffness: 300,
          }),
        ]).start()
      },
    })
  ).current

  // 弹窗隐藏时不渲染
  if (!visible) return null

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {
            height: heightAnim,
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* 小横线 */}
        <View style={styles.line} />
        {/* 弹窗头部 */}
        {headerSlot ? (
          <View style={styles.header}>{headerSlot}</View>
        ) : (
          <View style={styles.header}>
            <View style={styles.leftSlot}>{leftSlot}</View>
            <View style={styles.titleSlot}>{titleSlot}</View>
            <View style={styles.rightSlot}>
              {rightSlot ?? (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <CloseIcon
                    width={24}
                    height={24}
                    color={globalColor.FONT_ONE}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* 弹窗内容区域 */}
        <View style={styles.content}>
          {imageUrl ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ) : (
            children
          )}
        </View>
      </Animated.View>
    </View>
  )
}

// 样式定义
const styles = createAdaptStyleSheet.create({
  // 遮罩层容器
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  // 弹窗主容器
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  // 弹窗头部样式
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
  },
  // 左侧插槽容器
  leftSlot: {
    minWidth: 40,
    alignItems: 'flex-start',
    flex: 1,
  },
  // 中间插槽容器
  titleSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 右侧插槽容器
  rightSlot: {
    minWidth: 40,
    alignItems: 'flex-end',
    flex: 1,
  },
  // 顶部拖动指示器
  line: {
    width: 32,
    height: 4,
    backgroundColor: '#9C9C9C',
    borderRadius: 2,
    position: 'absolute',
    top: 8,
    left: '50%',
    transform: [{ translateX: -16 }],
  },
  // 关闭按钮
  closeButton: {
    padding: 4,
  },
  // 内容区域
  content: {
    flex: 1,
  },
  // 图片容器
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  // 图片样式
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
})
