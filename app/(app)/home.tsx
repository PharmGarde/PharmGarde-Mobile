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

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      title: 'Profile',
      icon: '👤',
      route: '/profile',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      route: '/settings',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg text-gray-600">Welcome back,</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {user?.attributes?.given_name || 'User'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={signOut}
              className="p-2 bg-gray-100 rounded-full"
            >
              <Text>👋</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 py-6">
          {/* Menu Items */}
          <View className="space-y-4">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center p-4 bg-gray-50 rounded-xl"
                onPress={() => router.push(item.route as any)}
              >
                <Text className="text-2xl mr-3">{item.icon}</Text>
                <Text className="text-lg font-medium text-gray-900">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* User Info Card */}
          <View className="mt-6 p-6 bg-primary/10 rounded-xl">
            <Text className="text-lg font-semibold text-primary mb-2">
              Account Information
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-600">
                Email: {user?.attributes?.email}
              </Text>
              <Text className="text-gray-600">
                Phone: {user?.attributes?.phone_number}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
