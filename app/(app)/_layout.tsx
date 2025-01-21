import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';

export default function AppLayout() {



  return (
    <Stack>
      {/* <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          headerShown: false
        }} 
      /> */}
      <Stack.Screen 
        name="geolocalisation" 
        options={{ 
          headerShown: false
        }} 
      />

    </Stack>
  );
}
