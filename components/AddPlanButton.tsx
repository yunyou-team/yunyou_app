import { globalColor } from '@/style/color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const AddPlanButton = (props: TouchableOpacityProps) => {
  const onPress = () => {
    router.push('/create');
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} style={styles.container}>
      <LinearGradient
        style={styles.linear_container}
        colors={globalColor.THEME_TWO.color as any}
      >
        <MaterialIcons name="add" size={24} color="#000" />
        <Text style={styles.buttonText}>创建行程</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    marginTop: 45
  },
  linear_container: {
    borderRadius: 16,
    height: 60,
    width: 176,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
})

export default AddPlanButton;
