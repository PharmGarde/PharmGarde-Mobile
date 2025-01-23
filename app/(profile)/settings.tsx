import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useAuth } from "../../auth/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Settings() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        </View>
      </View>

      {/* Preferences Section */}
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-sm font-medium text-gray-500 mb-2">
          Preferences
        </Text>
        <View className="space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-gray-900">Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-gray-900">Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
            />
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-sm font-medium text-gray-500 mb-2">Account</Text>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => router.push("/(profile)/change-password")}
          >
            <Text className="text-base text-gray-900">Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(profile)/privacy-settings")}
          >
            <Text className="text-base text-gray-900">Privacy Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Support Section */}
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-sm font-medium text-gray-500 mb-2">Support</Text>
        <View className="space-y-4">
          <TouchableOpacity onPress={() => router.push("/(profile)/help-center")}>
            <Text className="text-base text-gray-900">Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(profile)/contact-us")}>
            <Text className="text-base text-gray-900">Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        className="mx-6 mt-8 bg-danger p-4 rounded-xl"
        onPress={signOut}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Sign Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}