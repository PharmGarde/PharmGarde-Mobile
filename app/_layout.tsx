import { Amplify } from '@aws-amplify/core';
import * as SplashScreen from 'expo-splash-screen';
import '@aws-amplify/react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from '../auth/authContext';
import { awsConfig } from '../auth/authConfig';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';


SplashScreen.preventAutoHideAsync();

Amplify.configure(awsConfig);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-ExtraBold":require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light" : require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-SemiBold" : require('../assets/fonts/Rubik-SemiBold.ttf')
  })

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)/index" />
        <Stack.Screen name="DetailsPage" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
