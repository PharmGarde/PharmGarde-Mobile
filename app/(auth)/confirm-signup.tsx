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
import { authService } from "../../auth/authService";
import { useTranslation } from "react-i18next";
import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import Navbar from "@/components/Navbar";

export default function ConfirmSignUp() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { username } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { isRTL } = useLayoutDirection();

  const validateCode = () => {
    if (!code.trim()) {
      setError("required");
      return false;
    }
    setError("");
    return true;
  };

  const handleConfirm = async () => {
    if (!validateCode()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Call confirmSignUp from authService
      await authService.confirmSignUp(username as string, code);
      setSuccessMessage("success");

      // Redirect to sign-in after a short delay
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error: any) {
      setError("error");
      console.error("Confirmation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");
    setSuccessMessage("");

    try {
      // Call resendConfirmationCode from authService
      await authService.resendConfirmationCode(username as string);
      setSuccessMessage("resent");
    } catch (error: any) {
      setError("error");
      console.error("Resend code error:", error);
    } finally {
      setIsResending(false);
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
                {t("confirmSignUp.verifyAccount")}
              </Text>
              <Text
                className={`text-base text-gray-500 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("confirmSignUp.enterCode")}
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4 w-full">
              {/* Error Message */}
              {error ? (
                <Text
                  className={`text-red-500 text-md mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t(`confirmSignUp.${error}`)}
                </Text>
              ) : null}

              {/* Success Message */}
              {successMessage ? (
                <Text
                  className={`text-green-500 text-md mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t(`confirmSignUp.${successMessage}`)}
                </Text>
              ) : null}

              {/* Verification Code Input */}
              <View className="w-full">
                <Text
                  className={`text-sm font-medium text-gray-700 mb-1.5 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("confirmSignUp.code")}
                </Text>
                <TextInput
                  className={`w-full h-12 px-4 border rounded-lg bg-white ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("confirmSignUp.enterVerificationCode")}
                  placeholderTextColor="#9CA3AF"
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    if (error) setError("");
                    if (successMessage) setSuccessMessage("");
                  }}
                  keyboardType="number-pad"
                  editable={!isLoading}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  }}
                />
              </View>

              {/* Confirm Button */}
              <TouchableOpacity
                className={`w-full h-12 rounded-lg justify-center items-center mt-6 ${
                  isLoading ? "bg-primary/70" : "bg-primary"
                }`}
                onPress={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {t("confirmSignUp.confirm")}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Resend Code */}
              <TouchableOpacity
                className="flex-row justify-center items-center py-4"
                onPress={handleResendCode}
                disabled={isResending}
              >
                {isResending ? (
                  <ActivityIndicator color="#007AFF" />
                ) : (
                  <Text className="text-primary font-semibold">
                    {t("confirmSignUp.resendCode")}
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
