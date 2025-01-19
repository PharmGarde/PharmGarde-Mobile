import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

const initialPharmacies = [
  { id: '1', name: 'Pharmacy 1', location: '123 Main St' },
  { id: '2', name: 'Pharmacy 2', location: '456 Oak Rd' },
  { id: '3', name: 'Pharmacy 3', location: '789 Pine Ln' },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(initialPharmacies);

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((pharmacy) => pharmacy.id !== id));
  };

  const renderPharmacyItem = ({ item }) => (
    <View style={styles.pharmacyItem}>
      <View style={styles.pharmacyInfo}>
        <View style={styles.iconContainer}>
          <IconSymbol name="cross.circle.fill" size={24} color={Colors.light.tint} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.pharmacyName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <IconSymbol name="mappin" size={14} color={Colors.light.icon} />
            <Text style={styles.pharmacyLocation}>{item.location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromFavorites(item.id)}
      >
        <IconSymbol name="trash" size={20} color={Colors.light.background} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved pharmacies</Text>
      </View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderPharmacyItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol name="heart" size={48} color={Colors.light.icon} />
          <Text style={styles.noFavoritesText}>No favorite pharmacies yet</Text>
          <Text style={styles.noFavoritesSubtext}>
            Your saved pharmacies will appear here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9', // Slightly off-white background
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  listContainer: {
    padding: 16,
  },
  pharmacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  pharmacyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyLocation: {
    fontSize: 14,
    color: Colors.light.icon,
    marginLeft: 4,
  },
  removeButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noFavoritesSubtext: {
    fontSize: 16,
    color: Colors.light.icon,
    textAlign: 'center',
  },
});

export default Favorites;