import { BottomPopup } from '@/components/BottomPopup'
import { FocusAwareStatusBar } from '@/components/FocusAwareStatusBar'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { fetchExampleInfo } from '@/services'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { globalColor } from '@/style/color'
import { createAdaptStyleSheet } from '@/utils/index'
import AttractionsIcon from '@/components/icons/AttractionsIcon'
import HotelIcon from '@/components/icons/HotelIcon'
import MoreIcon from '@/components/icons/MoreIcon'

// 定义选项卡数据
const TABS = [
  {
    id: 'attractions',
    label: '景点',
    icon: <AttractionsIcon width={16} height={16} />,
  },
  {
    id: 'hotel',
    label: '住宿',
    icon: <HotelIcon width={16} height={16} />,
  },
  {
    id: 'more',
    label: '其他',
    icon: <MoreIcon width={16} height={16} />,
  },
]

export default function CreateScreen() {
  // 状态管理
  const [info, setInfo] = useState('请求中...') // 示例信息
  const [isPopupVisible, setIsPopupVisible] = useState(false) // 控制弹窗显示
  const [activeTab, setActiveTab] = useState('attractions') // 当前激活的选项卡
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
        <View style={styles.container}>
          {/* 选项卡区域 */}
          <View style={styles.tabsContainer}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <View style={styles.tabContent}>
                  {tab.icon}
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab.id && styles.activeTabText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 地址输入区域 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.addressInput}
              placeholder="请输入景点地址，支持复制粘贴"
              placeholderTextColor={globalColor.FONT_THREE}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          <View style={styles.line} />

          {/* 备注信息区域 */}
          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="备注景点门票、预约等信息..."
              placeholderTextColor={globalColor.FONT_THREE}
              multiline
            />
          </View>
        </View>
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
  // 容器样式
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // 选项卡容器样式
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8, // 选项卡之间的间距
  },
  // 单个选项卡样式
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 27,
    backgroundColor: '#f5f5f5',
  },
  // 激活状态的选项卡样式
  activeTab: {
    backgroundColor: '#e8ff7f', // 浅黄色背景
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 20,
  },
  // 选项卡文字样式
  tabText: {
    fontSize: 16,
    color: globalColor.FONT_ONE,
    fontWeight: '400',
  },
  // 激活状态的选项卡文字样式
  activeTabText: {
    fontWeight: '500',
  },
  // 输入框容器样式
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  // 地址输入框样式
  addressInput: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    height: 40,
    backgroundColor: globalColor.BACKGROUND_ONE,
    textAlignVertical: 'center',
  },
  line: {
    height: 1.5,
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: globalColor.BACKGROUND_ONE,
  },
  // 备注容器样式
  noteContainer: {
    padding: 20,
    paddingLeft: 30,
  },
  // 备注输入框样式
  noteInput: {
    fontSize: 14,
    color: globalColor.FONT_ONE,
    minHeight: 80, // 备注区域最小高度
  },
})
