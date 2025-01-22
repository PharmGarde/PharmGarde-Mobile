import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PharmacyCard } from '@/components/PharmacyCard';
import apiClient from "@/config/axios";

// const initialPharmacies = [
//   { id: '1', name: 'Pharmacy 1', location: '123 Main St', image: require('@/assets/images/default-pharmacy.jpg') },
//   { id: '2', name: 'Pharmacy 2', location: '456 Oak Rd', image: require('@/assets/images/default-pharmacy.jpg') },
//   { id: '3', name: 'Pharmacy 3', location: '789 Pine Ln', image: require('@/assets/images/default-pharmacy.jpg') },
// ];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    async function fetchFavorites(){
        const response = await apiClient.get('/favorites');
        const pharmacies = response.data[0].pharmacies;
        console.log('response',response.data[0].pharmacies);
        setFavorites(pharmacies);

      
        return pharmacies;
    }

    fetchFavorites();
  },[]);

  console.log('favorites', favorites);

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((pharmacy) => pharmacy.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved pharmacies</Text>
      </View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PharmacyCard
              id={item._id}
              name={item.name}
              location={item.address}
              image={''}
              onRemove={removeFromFavorites}
            />
          )}
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
  container: { flex: 1, backgroundColor: '#F7F8F9' },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.light.text, marginBottom: 4 },
  subtitle: { fontSize: 16, color: Colors.light.icon },
  listContainer: { padding: 16 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noFavoritesText: { fontSize: 20, fontWeight: '600', color: Colors.light.text, marginTop: 16, marginBottom: 8 },
  noFavoritesSubtext: { fontSize: 16, color: Colors.light.icon, textAlign: 'center' },
});

export default Favorites;
