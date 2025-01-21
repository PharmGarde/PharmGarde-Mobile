import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../auth/authContext";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import { SafeAreaView } from "react-native";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      password: "",
      general: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = t("signIn.usernameRequired");
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t("signIn.passwordRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signIn(formData.username, formData.password);
      router.replace("/(app)/home");
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StatusBar style="dark" />
        <Navbar />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center">
            {/* Header */}
            <View
              className={`mb-8 ${isRTL ? "items-end" : "items-start"} w-full`}
            >
              <Text
                className={`text-3xl font-bold text-gray-800 mb-2 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("signIn.welcomeBack")}
              </Text>
              <Text
                className={`text-base text-gray-500 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("signIn.signInToContinue")}
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4 w-full">
              {/* General Error Message */}
              {errors.general ? (
                <Text
                  className={`text-red-500 text-sm mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {errors.general}
                </Text>
              ) : null}

              {/* Username Input */}
              <View className="w-full">
                <Text
                  className={`text-sm font-medium text-gray-700 mb-1.5 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("signIn.username")}
                </Text>
                <TextInput
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("signIn.enterUsername")}
                  placeholderTextColor="#9CA3AF"
                  value={formData.username}
                  onChangeText={(text) => {
                    setFormData((prev) => ({ ...prev, username: text }));
                    if (errors.username) {
                      setErrors((prev) => ({ ...prev, username: "" }));
                    }
                  }}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
                {errors.username ? (
                  <Text
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.username}
                  </Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View className="w-full mt-4">
                <Text
                  className={`text-sm font-medium text-gray-700 mb-1.5 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("signIn.password")}
                </Text>
                <TextInput
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("signIn.enterPassword")}
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(text) => {
                    setFormData((prev) => ({ ...prev, password: text }));
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  secureTextEntry
                  editable={!isLoading}
                />
                {errors.password ? (
                  <Text
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                className={`w-full h-12 rounded-lg justify-center items-center mt-6 ${
                  isLoading ? "bg-primary/70" : "bg-primary"
                }`}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {t("signIn.signIn")}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View
                className={`flex-row justify-center items-center mt-6 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Text className="text-gray-600">
                  {t("signIn.dontHaveAccount")}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                  disabled={isLoading}
                >
                  <Text className="text-primary font-semibold">
                    {t("signIn.signUp")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
