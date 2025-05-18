import { BottomPopup } from '@/components/BottomPopup'
import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { fetchExampleInfo } from '@/services'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Text, View, TouchableOpacity } from 'react-native'
import { globalColor } from '@/style/color'
import { createAdaptStyleSheet } from '@/utils/index'
import CreateTrip from '@/app/components/index/CreateTrip'

export default function CreateScreen() {
  // 状态管理
  const [info, setInfo] = useState('请求中...') // 示例信息
  const [isPopupVisible, setIsPopupVisible] = useState(false) // 控制弹窗显示
  const [activeTab, setActiveTab] = useState<'attractions' | 'hotel' | 'more'>(
    'attractions'
  ) // 当前激活的选项卡
  const [address, setAddress] = useState('') // 地址输入内容

  // 初始化数据
  useEffect(() => {
    fetchExampleInfo().then((res) => {
      setInfo(res.info)
    })
  }, [])

  // 返回上一页
  const goBack = () => {
    router.back()
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FocusAwareStatusBar />

      <TabBarIcon name="arrow-back" onPress={goBack} />
      <Text>{info}</Text>
      <Button title="打开弹窗" onPress={() => setIsPopupVisible(true)} />

      {/* 添加行程弹窗 */}
      <BottomPopup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        leftSlot={
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        }
        titleSlot={<Text style={styles.popupTitle}>添加安排</Text>}
      >
        <CreateTrip
          address={address}
          setAddress={setAddress}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </BottomPopup>
    </View>
  )
}

// 样式定义
const styles = createAdaptStyleSheet.create({
  saveButton: {
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: globalColor.BACKGROUND_ONE,
  },
  saveButtonText: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: globalColor.FONT_ONE,
    fontWeight: '400',
    textAlign: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: globalColor.FONT_ONE,
  },
})
