
import { Amplify } from '@aws-amplify/core';
import '@aws-amplify/react-native';
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { AuthProvider } from "../auth/authContext";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18nConfig";
import { awsConfig } from "../auth/authConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding

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

  // Initialize Amplify
  useEffect(() => {
    const configureAmplify = async () => {
      try {
        Amplify.configure({
          ...awsConfig,
          storage: AsyncStorage,
          Logging: {
            level: "DEBUG",
          },
        });
        console.log("Amplify configured successfully");
      } catch (error) {
        console.error(
          "Error configuring Amplify:",
          JSON.stringify(error, null, 2)
        );
      }
    };

    configureAmplify();
  }, []);

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
      {" "}
      {/* Wrap your app with I18nextProvider */}
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(home)"  options={{ headerShown: false }}  />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </I18nextProvider>
  );
}
