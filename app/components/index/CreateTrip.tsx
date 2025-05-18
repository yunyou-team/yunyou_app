import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
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

const CreateTrip: React.FC<CreateTripProps> = ({
  address,
  setAddress,
  activeTab,
  setActiveTab,
}) => {
  return (
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
})

export default CreateTrip
