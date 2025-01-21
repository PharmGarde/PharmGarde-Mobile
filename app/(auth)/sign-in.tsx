import React, { useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../auth/authContext";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!formData.username || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(formData.username, formData.password);
      router.replace("/(app)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-dark mb-2">
              Welcome back!
            </Text>
            <Text className="text-base text-gray-500">Sign in to continue</Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Username
              </Text>
              <TextInput
                style={{ marginTop: 5 }}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your username"
                value={formData.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Password
              </Text>
              <TextInput
                style={{ marginTop: 5 }}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Forgot Password */}
            {/* <TouchableOpacity
              className="self-end"
              onPress={() => router.push('/forgot-password')}
            >
              <Text className="text-primary font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity> */}

            {/* Sign In Button */}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              className={`h-12 rounded-lg justify-center items-center ${
                isLoading ? "bg-primary/70" : "bg-primary"
              }`}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              className="flex-row justify-center items-center py-4"
              onPress={() => router.push("/sign-up")}
              disabled={isLoading}
            >
              <Text className="text-gray-600">Don't have an account? </Text>
              <Text className="text-primary font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
