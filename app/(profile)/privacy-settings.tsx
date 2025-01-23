import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function PrivacySettings() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Privacy Settings</Text>
        </View>
      </View>

      {/* Privacy Options */}
      <View className="px-6 py-6 space-y-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-base text-gray-900">Show Profile to Others</Text>
          <Switch
            value={showProfile}
            onValueChange={setShowProfile}
            trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-base text-gray-900">Show Activity Status</Text>
          <Switch
            value={showActivity}
            onValueChange={setShowActivity}
            trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
          />
        </View>

        <TouchableOpacity className="w-full h-12 bg-primary rounded-lg justify-center items-center">
          <Text className="text-white font-semibold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}