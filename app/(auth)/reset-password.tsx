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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/auth/authContext";
import { useTranslation } from "react-i18next";
import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import Navbar from "@/components/Navbar";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { username } = useLocalSearchParams();
  const router = useRouter();
  const { resetPassword } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLayoutDirection();

  const handleSubmit = async () => {
    // Validate fields
    if (!code.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("required");
      return;
    }

    if (newPassword.length < 8) {
      setError("passwordTooShort");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("passwordMismatch");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Call resetPassword from useAuth
      await resetPassword(username as string, code, newPassword);
      setSuccessMessage("success");

      // Redirect to sign-in after a short delay
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error: any) {
      setError("error");
      console.error("Reset password error:", error);
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
                {t("resetPassword.title")}
              </Text>
              <Text
                className={`text-base text-gray-500 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("resetPassword.subtitle")}
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
                  {t(`resetPassword.${error}`)}
                </Text>
              )}

              {/* Success Message */}
              {successMessage && (
                <Text
                  className={`text-green-500 text-sm mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t(`resetPassword.${successMessage}`)}
                </Text>
              )}

              {/* Verification Code Input */}
              <View>
                <Text
                  className={`text-sm font-medium text-gray-700 mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("resetPassword.code")}*
                </Text>
                <TextInput
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("resetPassword.enterCode")}
                  placeholderTextColor="#9CA3AF"
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    if (error) setError("");
                  }}
                  keyboardType="number-pad"
                  editable={!isLoading}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                />
              </View>

              {/* New Password Input */}
              <View>
                <Text
                  className={`text-sm font-medium text-gray-700 mt-5 mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("resetPassword.newPassword")}*
                </Text>
                <TextInput
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("resetPassword.enterNewPassword")}
                  placeholderTextColor="#9CA3AF"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (error) setError("");
                  }}
                  secureTextEntry
                  editable={!isLoading}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                />
              </View>

              {/* Confirm Password Input */}
              <View>
                <Text
                  className={`text-sm font-medium text-gray-700 mt-5 mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("resetPassword.confirmPassword")}*
                </Text>
                <TextInput
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("resetPassword.confirmNewPassword")}
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (error) setError("");
                  }}
                  secureTextEntry
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
                    {t("resetPassword.submit")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}