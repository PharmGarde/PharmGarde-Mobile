import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import React from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Ionicons name="menu" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>PharmGarde</Text>
      </View>

      {isMenuOpen && (
        <View style={styles.drawer}>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => {
              router.push('/(home)');
              setIsMenuOpen(false);
            }}
          >
            <Ionicons name="home-outline" size={24} color="#333" />
            <Text style={styles.drawerText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => {
              router.push('/(auth)/sign-in');
              setIsMenuOpen(false);
            }}
          >
            <Ionicons name="log-in-outline" size={24} color="#333" />
            <Text style={styles.drawerText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => {
              router.push('/(app)/profile');
              setIsMenuOpen(false);
            }}
          >
            <Ionicons name="person-outline" size={24} color="#333" />
            <Text style={styles.drawerText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {isMenuOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1,
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontFamily: 'Rubik-Medium',
    fontSize: 20,
    marginLeft: 15,
    color: '#333',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 80,
    paddingHorizontal: 20,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  drawerText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
}); 