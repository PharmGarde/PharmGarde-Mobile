import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          marginHorizontal: 16,
          marginBottom: 12,
          height: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 8,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          height: 50,  // Set explicit height
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 4, // Small adjustment to account for the indicator space
            }}>
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -12, 
                    width: 40,
                    height: 4,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                  }}
                />
              )}
              <IconSymbol
                size={25}
                name="house.fill"
                color={Colors[colorScheme ?? 'light'].tint}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 4, // Small adjustment to account for the indicator space
            }}>
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -12, 
                    width: 40,
                    height: 4,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                  }}
                />
              )}
              <IconSymbol
                size={25}
                name="heart.fill"
                color={Colors[colorScheme ?? 'light'].tint}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}