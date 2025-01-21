import { Amplify } from '@aws-amplify/core';
import '@aws-amplify/react-native';
import { Stack } from 'expo-router';



export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" redirect={true} />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="geolocalisation" options={{ title: 'Geolocalisation' }} />

      </Stack>
  );
}
