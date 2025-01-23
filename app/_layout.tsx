import * as SplashScreen from "expo-splash-screen";
import { Stack, Redirect } from "expo-router";
import { AuthProvider, useAuth } from "../auth/authContext";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18nConfig";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Guarded Layout for Protected Routes
function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Render protected routes
  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

// Main Layout
export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // Hide the splash screen when fonts are loaded
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

  // Return null if fonts are not loaded
  if (!fontsLoaded) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Public Routes */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* Protected Routes */}
          <ProtectedLayout />
        </Stack>
      </AuthProvider>
    </I18nextProvider>
  );
}