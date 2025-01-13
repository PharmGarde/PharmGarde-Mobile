import { Amplify } from '@aws-amplify/core';
import '@aws-amplify/react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from '../auth/authContext';
import { awsConfig } from '../auth/authConfig';

Amplify.configure(awsConfig);

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" redirect={true} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthProvider>
  );
}
