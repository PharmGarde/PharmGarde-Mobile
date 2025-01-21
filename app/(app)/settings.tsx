import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useAuth } from '../../auth/authContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          title: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          title: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Change Password',
          type: 'link',
          onPress: () => {},
        },
        {
          title: 'Privacy Settings',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          type: 'link',
          onPress: () => {},
        },
        {
          title: 'Contact Us',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
  ];

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
            <Text className="text-xl font-semibold">Settings</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1">
          {settingsSections.map((section, sectionIndex) => (
            <View
              key={sectionIndex}
              className="px-6 py-4 border-b border-gray-100"
            >
              <Text className="text-sm font-medium text-gray-500 mb-2">
                {section.title}
              </Text>
              <View className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={item.type === 'link' ? item.onPress : undefined}
                    className="flex-row items-center justify-between"
                  >
                    <Text className="text-base text-gray-900">
                      {item.title}
                    </Text>
                    {item.type === 'toggle' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: '#D1D5DB', true: '#007AFF' }}
                      />
                    )}
                    {item.type === 'link' && (
                      <Text className="text-gray-400">→</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Sign Out Button */}
          <TouchableOpacity
            className="mx-6 mt-6 p-4 bg-danger rounded-xl"
            onPress={signOut}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
