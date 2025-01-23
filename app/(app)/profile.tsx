import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from '../../auth/authContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4"
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Profile</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 py-6">
          {/* Profile Picture */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
              {user?.attributes?.picture ? (
                <Image
                  source={{ uri: user.attributes.picture }}
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <Text className="text-4xl">👤</Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Text className="text-primary font-medium">Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Information */}
          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Full Name</Text>
              <Text className="text-lg font-medium">
                {user?.attributes?.given_name} {user?.attributes?.family_name}
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Email</Text>
              <Text className="text-lg font-medium">
                {user?.attributes?.email}
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Phone Number</Text>
              <Text className="text-lg font-medium">
                {user?.attributes?.phone_number}
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Username</Text>
              <Text className="text-lg font-medium">
                {user?.username}
              </Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity className="mt-6 bg-primary p-4 rounded-xl">
            <Text className="text-white text-center font-semibold text-lg">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
