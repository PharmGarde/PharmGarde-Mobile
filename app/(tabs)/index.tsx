import { StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#1CD4C6', '#0CAFA3']} style={styles.background}>
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
        />

        
      </View>
      <View>
        <Text style={styles.span}>Let's Get</Text>
        <Text style={styles.title}>Started</Text>
        <Text style={styles.slogan}>Find a pharmacy near you</Text>
      </View>

      <View style={{ marginVertical: 22, alignItems: 'center', }}>

        {/* Custom Button with Pressable */}
        <Pressable
          style={({ pressed }) => [
            styles.customButton,
            pressed && styles.buttonPressed, // Apply pressed style when the button is pressed
          ]}
          onPress={() => Alert.alert('Button pressed!')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  span: {
    fontSize: 50,
    fontWeight: '800',
    color: '#ffff',
  },
  title: {
    fontSize: 46,
    fontWeight: '800',
    color: '#ffff',
  },
  slogan: {
    fontSize: 16,
    marginVertical: 4,
    color: '#ffff',
  },
  customButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: 200, // Reduced width
  },
  buttonPressed: {
    backgroundColor: '#d9d9d9', // Change background color when pressed
  },
  buttonText: {
    color: '#007260',
    fontSize: 16,
    fontWeight: '600',
  },
});
