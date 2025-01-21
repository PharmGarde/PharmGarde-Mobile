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
import { StatusBar } from "expo-status-bar";

export default function ConfirmSignUp() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const validateCode = () => {
    if (!code.trim()) {
      setError("Please enter the verification code");
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
      await authService.confirmSignUp(username as string, code);
      setSuccessMessage("Account confirmed successfully");
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");
    setSuccessMessage("");

    try {
      await authService.resendConfirmationCode(username as string);
      setSuccessMessage("Verification code has been resent");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar style="dark" />
      <View className="flex-1 px-6 justify-center">
        {/* Header */}
        <View className="mb-8" style={{ alignItems: "center" }}>
          <Text className="text-3xl font-bold text-dark mb-2">
            Verify Account
          </Text>
          <Text className="text-base text-gray-500">
            Enter the verification code sent to your email
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 text-md text-center mb-4">
              {error}
            </Text>
          ) : null}

          {/* Success Message */}
          {successMessage ? (
            <Text className="text-green-500 text-sm text-center mb-2">
              {successMessage}
            </Text>
          ) : null}

          <View style={{ marginBottom: 20 }}>
            <Text className="text-sm font-medium text-gray-700 mb-4">
              Verification Code
            </Text>
            <TextInput
              className={`w-full h-12 px-4 border rounded-lg bg-white ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter verification code"
              value={code}
              onChangeText={(text) => {
                setCode(text);
                if (error) setError("");
                if (successMessage) setSuccessMessage("");
              }}
              keyboardType="number-pad"
              editable={!isLoading}
            />
            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            ) : null}
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            className={`h-12 rounded-lg justify-center items-center ${
              isLoading ? "bg-primary/70" : "bg-primary"
            }`}
            onPress={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Confirm
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
                Resend verification code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
