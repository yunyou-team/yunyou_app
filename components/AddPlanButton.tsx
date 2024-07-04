import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const AddPlanButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <LinearGradient
        style={styles.constainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.3, 1]}
        colors={['#49E1C4', '#10D3B1']}
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
    fontWeight: 600,
    fontSize: 20,
    color: 'white',
  }
})

export default AddPlanButton;
