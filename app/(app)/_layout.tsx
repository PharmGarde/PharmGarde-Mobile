import { Stack } from 'expo-router';
import { useAuth } from '../../auth/authContext';
import { Redirect } from 'expo-router';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen 
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
      />
    </Stack>
  );
}
