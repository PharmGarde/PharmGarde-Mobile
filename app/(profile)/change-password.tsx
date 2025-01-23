import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Add logic to change password
    console.log("Changing password...");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Change Password</Text>
        </View>
      </View>

      {/* Form */}
      <View className="px-6 py-6 space-y-6">
        <View>
          <Text className="text-sm text-gray-500 mb-1">Current Password</Text>
          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Enter current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">New Password</Text>
          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Confirm New Password</Text>
          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full h-12 bg-primary rounded-lg justify-center items-center"
          onPress={handleChangePassword}
        >
          <Text className="text-white font-semibold text-lg">Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}