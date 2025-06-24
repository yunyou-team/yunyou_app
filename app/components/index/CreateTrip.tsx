import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native'
import { globalColor } from '@/style/color'
import AttractionsIcon from '@/components/icons/AttractionsIcon'
import HotelIcon from '@/components/icons/HotelIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import { createAdaptStyleSheet } from '@/utils/index'

type TabId = 'attractions' | 'hotel' | 'more'

interface CreateTripProps {
  address: string
  setAddress: (address: string) => void
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

const TABS = [
  {
    id: 'attractions' as TabId,
    label: '景点',
    icon: <AttractionsIcon width={16} height={16} />,
  },
  {
    id: 'hotel' as TabId,
    label: '住宿',
    icon: <HotelIcon width={16} height={16} />,
  },
  {
    id: 'more' as TabId,
    label: '其他',
    icon: <MoreIcon width={16} height={16} />,
  },
]

const SCREEN_WIDTH = Dimensions.get('window').width

// 搜索结果类型
type SearchResult = { id: string; name: string; address: string }

const CreateTrip: React.FC<CreateTripProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [tabData, setTabData] = useState({
    attractions: { address: '', note: '' },
    hotel: { address: '', note: '' },
    more: { address: '', note: '' },
  })
  const animation = useRef(new Animated.Value(0)).current
  const prevTab = useRef<TabId>('attractions')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) return
    prevTab.current = activeTab
    animation.setValue(-SCREEN_WIDTH)
    setActiveTab(tab)
    setSearchResults([]) // 切换tab时清空搜索结果
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const handleAddressChange = (text: string) => {
    setTabData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], address: text },
    }))
    // TODO：mock搜索结果需要替换为真实后端返回
    if (text.trim()) {
      setSearchResults([
        { id: '1', name: text + '·人民公园', address: '北京市朝阳区xx路1号' },
        { id: '2', name: text + '·科技馆', address: '北京市海淀区yy路2号' },
        { id: '3', name: text + '·博物馆', address: '北京市东城区zz路3号' },
      ])
    } else {
      setSearchResults([])
    }
  }

  const handleSelectResult = (item: SearchResult) => {
    setTabData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], address: item.name },
    }))
    setSearchResults([])
  }

  // 变更备注
  const handleNoteChange = (text: string) => {
    setTabData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], note: text },
    }))
  }

  return (
    <View style={styles.container}>
      {/* 选项卡区域 */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => handleTabChange(tab.id)}
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

      {/* 内容区域动画包裹 */}
      <Animated.View
        style={{
          transform: [{ translateX: animation }],
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.addressInput}
            placeholder="请输入景点地址，支持复制粘贴"
            placeholderTextColor={globalColor.FONT_THREE}
            value={tabData[activeTab].address}
            onChangeText={handleAddressChange}
            numberOfLines={1}
            maxLength={100}
            returnKeyType="done"
          />
          {searchResults.length > 0 && (
            <View style={styles.searchList}>
              {searchResults.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.searchItem}
                  onPress={() => handleSelectResult(item)}
                >
                  <Text style={styles.searchItemName}>{item.name}</Text>
                  <Text style={styles.searchItemAddress}>{item.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.line} />

        {/* 备注信息区域 */}
        <View style={styles.noteContainer}>
          <TextInput
            style={styles.noteInput}
            placeholder="备注景点门票、预约等信息..."
            placeholderTextColor={globalColor.FONT_THREE}
            value={tabData[activeTab].note}
            onChangeText={handleNoteChange}
            multiline
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = createAdaptStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 27,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#e8ff7f',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  activeTabText: {
    fontWeight: '500',
  },
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  addressInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    height: 40,
  },
  line: {
    height: 1.5,
    marginTop: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  noteContainer: {
    padding: 20,
  },
  noteInput: {
    fontSize: 14,
    color: '#222',
    minHeight: 80,
  },
  searchList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
  },
  searchItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchItemName: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  searchItemAddress: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
})

export default CreateTrip
