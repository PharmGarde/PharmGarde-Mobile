import { View, TouchableOpacity, Text, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/authContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const { t, i18n } = useTranslation();

  const slideAnim = useRef(new Animated.Value(-320)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isRTL = i18n.language === "ar";

  const toggleLanguage = async () => {
    const newLang = isRTL ? "en" : "ar";
    await i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  useEffect(() => {
    if (isMenuOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: isRTL ? 320 : -320,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMenuOpen, isRTL]);

  return (
    <>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
        {/* Left side (or Right side in RTL) */}
        {isRTL ? (
          <TouchableOpacity
            className="flex-row items-center p-2 rounded-full active:bg-gray-100 space-x-2"
            onPress={toggleLanguage}
          >
            <Text className="font-medium text-gray-600 ml-2">EN</Text>
            <Ionicons name="language" size={24} color="#374151" />
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-2 rounded-full active:bg-gray-100"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons
                name={isMenuOpen ? "close" : "menu"}
                size={28}
                color="#374151"
              />
            </TouchableOpacity>
            <Text className="ml-3 text-xl font-medium text-gray-800">
              {t("navbar.appName")}
            </Text>
          </View>
        )}

        {/* Right side (or Left side in RTL) */}
        {isRTL ? (
          <View className="flex-row items-center">
            <Text className="mr-3 text-xl font-medium text-gray-800">
              {t("navbar.appName")}
            </Text>
            <TouchableOpacity
              className="p-2 rounded-full active:bg-gray-100"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons
                name={isMenuOpen ? "close" : "menu"}
                size={28}
                color="#374151"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="flex-row items-center p-2 rounded-full active:bg-gray-100 space-x-2"
            onPress={toggleLanguage}
          >
            <Ionicons name="language" size={24} color="#374151" />
            <Text className="font-medium text-gray-600 ml-2">عربي</Text>
          </TouchableOpacity>
        )}
      </View>

      <Animated.View
        className="absolute top-0 h-full bg-white z-50 shadow-xl"
        style={{
          width: "80%",
          transform: [{ translateX: slideAnim }],
          [isRTL ? "right" : "left"]: 0,
        }}
      >
        <View className="pt-16 px-4">
          <TouchableOpacity
            className={`flex-row items-center p-4 mb-2 rounded-lg active:bg-gray-100 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
            onPress={() => {
              router.push("/(home)");
              setIsMenuOpen(false);
            }}
          >
            <Ionicons name="home-outline" size={24} color="#374151" />
            <Text
              className={`font-medium text-gray-700 ${isRTL ? "mr-3" : "ml-3"}`}
            >
              {t("navbar.home")}
            </Text>
          </TouchableOpacity>

          {!isAuthenticated && (
            <TouchableOpacity
              className={`flex-row items-center p-4 mb-2 rounded-lg active:bg-gray-100 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
              onPress={() => {
                router.push("/(auth)/sign-in");
                setIsMenuOpen(false);
              }}
            >
              <Ionicons name="log-in-outline" size={24} color="#374151" />
              <Text
                className={`font-medium text-gray-700 ${
                  isRTL ? "mr-3" : "ml-3"
                }`}
              >
                {t("navbar.login")}
              </Text>
            </TouchableOpacity>
          )}

          {isAuthenticated && (
            <>
              <TouchableOpacity
                className={`flex-row items-center p-4 mb-2 rounded-lg active:bg-gray-100 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
                onPress={() => {
                  router.push("/(profile)");
                  setIsMenuOpen(false);
                }}
              >
                <Ionicons name="person-outline" size={24} color="#374151" />
                <Text
                  className={`font-medium text-gray-700 ${
                    isRTL ? "mr-3" : "ml-3"
                  }`}
                >
                  {t("navbar.profile")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-row items-center p-4 mb-2 rounded-lg active:bg-gray-100 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
                onPress={handleSignOut}
              >
                <Ionicons name="log-out-outline" size={24} color="#374151" />
                <Text
                  className={`font-medium text-gray-700 ${
                    isRTL ? "mr-3" : "ml-3"
                  }`}
                >
                  {t("navbar.signOut")}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>

      {isMenuOpen && (
        <Animated.View
          className="absolute inset-0 bg-black/50 z-40"
          style={{ opacity: fadeAnim }}
        >
          <TouchableOpacity
            className="w-full h-full"
            onPress={() => setIsMenuOpen(false)}
          />
        </Animated.View>
      )}
    </>
  );
}
