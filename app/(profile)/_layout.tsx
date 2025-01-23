import { Stack } from "expo-router";
import { useAuth } from "../../auth/authContext";

export default function ProfileLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privacy-settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help-center"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contact-us"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}