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
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../auth/authContext';
import { StatusBar } from 'expo-status-bar';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    given_name: '',
    family_name: '',
    phone_number: '',
    picture: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!formData.username || !formData.password || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp(formData);
      if (result.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        router.push({
          pathname: '/confirm-signup',
          params: { username: formData.username },
        });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 py-12">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-dark mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-500">
              Sign up to get started
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Username */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Username*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Choose a username"
                value={formData.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Email*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, email: text }))
                }
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Password*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* First Name */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                First Name*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your first name"
                value={formData.given_name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, given_name: text }))
                }
                editable={!isLoading}
              />
            </View>

            {/* Last Name */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your last name"
                value={formData.family_name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, family_name: text }))
                }
                editable={!isLoading}
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </Text>
              <TextInput
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, phone_number: text }))
                }
                keyboardType="phone-pad"
                editable={!isLoading}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`h-12 rounded-lg justify-center items-center mt-6 ${
                isLoading ? 'bg-primary/70' : 'bg-primary'
              }`}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              className="flex-row justify-center items-center py-4"
              onPress={() => router.push('/sign-in')}
              disabled={isLoading}
            >
              <Text className="text-gray-600">Already have an account? </Text>
              <Text className="text-primary font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
