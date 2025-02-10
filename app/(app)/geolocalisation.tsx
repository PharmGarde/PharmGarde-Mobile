import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Switch,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewComponent from '@/components/ui/MapViewComponent';
import { Ionicons } from '@expo/vector-icons';
import { calculateDistance, callPharmacy } from '@/helpers/calculateDistance';
import { Coordinates, Pharmacy } from '@/types/types';

const YOUSSOUFIA_COORDS: Coordinates = {
  latitude: 32.2460,
  longitude: -8.5298,
};

const NearbyPlaces = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('http://172.16.9.4:3000/pharmacy');
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
        setPharmacies([]);
      }
    };

    fetchPharmacies();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setIsLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (err) {
        setError('Error getting location');
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const pharmaciesWithDistance = pharmacies.map((pharmacy) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          pharmacy.latitude,
          pharmacy.longitude
        );
        return { ...pharmacy, distance };
      });

      const sortedPharmacies = pharmaciesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      if (sortedPharmacies.length > 0) {
        setSelectedPharmacy(sortedPharmacies[0]);
      }
    }
  }, [currentLocation, pharmacies]);

  const filteredPharmacies = pharmacies
    .filter((pharmacy) => 
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showOnlyOnDuty || pharmacy.isOnDuty)
    )
    .map((pharmacy) => {
      const distance = currentLocation
        ? calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            pharmacy.latitude,
            pharmacy.longitude
          )
        : null;
      return { ...pharmacy, distance };
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  const handleMarkerPress = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const renderPharmacyItem = ({ item }: { item: Pharmacy & { distance: number | null } }) => (
    <TouchableOpacity style={styles.pharmacyItem}>
      <Image source={{ uri: item.image }} style={styles.pharmacyImage} />
      <View style={styles.pharmacyInfo}>
        <Text style={styles.pharmacyName}>{item.name}</Text>
        <Text style={styles.pharmacyAddress}>{item.address}</Text>
        <Text style={item.isOnDuty ? styles.onDutyText : styles.offDutyText}>
          {item.isOnDuty ? 'On Duty' : 'Off Duty'}
        </Text>
        <Text style={styles.pharmacyHours}>{item.openingHours}</Text>
        {item.distance !== null && (
          <Text style={styles.pharmacyDistance}>Distance: {item.distance.toFixed(2)} km</Text>
        )}
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => callPharmacy(item.phoneNumber)}
        >
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setIsLoading(true)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search pharmacies"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {showOnlyOnDuty ? 'Show On Duty Only' : 'Show All Pharmacies'}
        </Text>
        <Switch
          value={showOnlyOnDuty}
          onValueChange={setShowOnlyOnDuty}
          trackColor={{ false: "#767577", true: "#166534" }}
          thumbColor={showOnlyOnDuty ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <MapViewComponent
        currentLocation={currentLocation}
        youssoufiaCoords={YOUSSOUFIA_COORDS}
        filteredPharmacies={filteredPharmacies}
        onMarkerPress={handleMarkerPress}
        selectedPharmacy={selectedPharmacy}
      />

      <FlatList
        data={filteredPharmacies}
        keyExtractor={(item) => item.id}
        renderItem={renderPharmacyItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  switchText: {
    fontSize: 14,
    color: '#666',
  },
  pharmacyItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  pharmacyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  onDutyText: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
  offDutyText: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
  },
  pharmacyHours: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  pharmacyDistance: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  callButton: {
    backgroundColor: '#166534',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    width: 80,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#166534',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default NearbyPlaces;