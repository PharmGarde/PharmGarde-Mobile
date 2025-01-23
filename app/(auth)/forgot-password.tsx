import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/auth/authContext";
import { useTranslation } from "react-i18next";
import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import Navbar from "@/components/Navbar";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLayoutDirection();

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await forgotPassword(username);
      setSuccessMessage("success");

      router.push({
        pathname: "/reset-password",
        params: { username },
      });
    } catch (error: any) {
      setError("error");
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Navbar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">
          <View className="w-full max-w-sm mx-auto">
            {/* Header */}
            <View className={`mb-8 ${isRTL ? "items-end" : "items-start"}`}>
              <Text
                className={`text-3xl font-bold text-gray-800 mb-2 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("forgotPassword.title")}
              </Text>
              <Text
                className={`text-base text-gray-500 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("forgotPassword.subtitle")}
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4 w-full">
              {/* Error Message */}
              {error && (
                <Text
                  className={`text-red-500 text-sm mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t(`forgotPassword.${error}`)}
                </Text>
              )}

              {/* Success Message */}
              {successMessage && (
                <Text
                  className={`text-green-500 text-sm mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t(`forgotPassword.${successMessage}`)}
                </Text>
              )}

              {/* Username Input */}
              <View>
                <Text
                  className={`text-sm font-medium text-gray-700 mb-1 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("forgotPassword.username")}*
                </Text>
                <TextInput
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("forgotPassword.enterUsername")}
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (error) setError("");
                  }}
                  editable={!isLoading}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className={`w-full h-12 rounded-lg justify-center items-center mt-6 ${
                  isLoading ? "bg-primary/70" : "bg-primary"
                }`}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {t("forgotPassword.submit")}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Back to Sign In Link */}
              <TouchableOpacity
                className="flex-row justify-center items-center py-4"
                onPress={() => router.push("/(auth)/sign-in")}
                disabled={isLoading}
              >
                <Text className="text-primary font-semibold">
                  {t("forgotPassword.backToSignIn")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
