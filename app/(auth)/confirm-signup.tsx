import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { authService } from '../../auth/authService';
import { StatusBar } from 'expo-status-bar';

export default function ConfirmSignUp() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleConfirm = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      await authService.confirmSignUp(username as string, code);
      Alert.alert('Success', 'Account confirmed successfully', [
        {
          text: 'OK',
          onPress: () => router.push('/sign-in'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await authService.resendConfirmationCode(username as string);
      Alert.alert('Success', 'Verification code has been resent');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar style="dark" />
      <View className="flex-1 px-6 justify-center">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-dark mb-2">
            Verify Account
          </Text>
          <Text className="text-base text-gray-500">
            Enter the verification code sent to your email
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </Text>
            <TextInput
              className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
              placeholder="Enter verification code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              editable={!isLoading}
            />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            className={`h-12 rounded-lg justify-center items-center ${
              isLoading ? 'bg-primary/70' : 'bg-primary'
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
