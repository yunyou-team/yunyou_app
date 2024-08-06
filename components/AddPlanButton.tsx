import { globalColor } from '@/style/color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const AddPlanButton = (props: TouchableOpacityProps) => {
  const onPress = () => {
    // 跳转
    // router.push('/create');
    router.push('create');
  }

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <LinearGradient
        style={styles.constainer}
        locations={globalColor.THEME_TWO.location}
        colors={globalColor.THEME_TWO.color}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.ButtonText}>创建行程</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12
  },
  ButtonText: {
    fontSize: 20,
    color: 'white',
  }
})

export default AddPlanButton;
