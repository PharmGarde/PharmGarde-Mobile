import { StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#1CD4C6', '#0CAFA3']} style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.span}>Let's Get</Text>
        <Text style={styles.title}>Started</Text>
        <Text style={styles.slogan}>Find a pharmacy near you</Text>
        <Pressable
          style={({ pressed }) => [
            styles.customButton,
            pressed && styles.buttonPressed,
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
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  span: {
    fontSize: 50,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  title: {
    fontSize: 46,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 100,
  },
  customButton: {
    backgroundColor: '#1CD4C6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#0CAFA3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
