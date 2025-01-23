


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import * as Location from 'expo-location';
import { calculateDistance, callPharmacy } from '@/helpers/calculateDistance';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewComponent from '@/components/ui/MapViewComponent';
import { Coordinates, Pharmacy } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';

const YOUSSOUFIA_COORDS: Coordinates = {
  latitude: 32.2460,
  longitude: -8.5298,
};

const PHARMACIES: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacy Youssoufia Centre',
    address: '123 Avenue Hassan II, Youssoufia',
    image: require('../../assets/images/icon.png'),
    latitude: 32.2460,
    longitude: -8.5298,
    isOnDuty: true,
    openingHours: '24/7',
    phoneNumber: '+212522334455',
  },
  {
    id: '2',
    name: 'Pharmacy Al Massira',
    address: '45 Rue Mohammed V, Youssoufia',
    image: require('../../assets/images/icon.png'),
    latitude: 32.2463,
    longitude: -8.5205,
    isOnDuty: false,
    openingHours: '9:00 - 21:00',
    phoneNumber: '+212522334456',
  },
];

const NearbyPlaces = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null); // Track selected pharmacy

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

  // Calculate distances and find the nearest pharmacy
  useEffect(() => {
    if (currentLocation) {
      const pharmaciesWithDistance = PHARMACIES.map((pharmacy) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          pharmacy.latitude,
          pharmacy.longitude
        );
        return { ...pharmacy, distance };
      });

      // Sort pharmacies by distance
      const sortedPharmacies = pharmaciesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      // Set the nearest pharmacy as the default selected pharmacy
      if (sortedPharmacies.length > 0) {
        setSelectedPharmacy(sortedPharmacies[0]);
      }
    }
  }, [currentLocation]);

  // Filter and sort pharmacies by distance
  const filteredPharmacies = PHARMACIES.filter((pharmacy) => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!showOnlyOnDuty || pharmacy.isOnDuty)
  ).map((pharmacy) => {
    const distance = currentLocation
      ? calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          pharmacy.latitude,
          pharmacy.longitude
        )
      : null;
    return { ...pharmacy, distance };
  }).sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by distance

  const handleMarkerPress = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy); // Set selected pharmacy on marker press
  };

  const renderPharmacyItem = ({ item }: { item: Pharmacy & { distance: number | null } }) => (
    <View>
      <TouchableOpacity className="border-b border-gray-200">
        <View className="flex-row p-4">
          <Image source={item.image} className="w-20 h-20 rounded-lg mr-4" />
          <View className="flex-1 justify-center">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600 mt-1">{item.address}</Text>
            <Text className={`font-medium mt-1 ${
              item.isOnDuty ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.isOnDuty ? 'On Duty' : 'Off Duty'}
            </Text>
            <Text className="text-gray-600 mt-1">{item.openingHours}</Text>
            {item.distance !== null && (
              <Text className="text-gray-600 mt-1">
                Distance: {item.distance.toFixed(2)} km
              </Text>
            )}
            <TouchableOpacity
              className="bg-green-800 p-2 rounded-lg mt-2 w-20"
              onPress={() => callPharmacy(item.phoneNumber)}
            >
              <Text className="text-white text-center">Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#166534" />
        <Text className="mt-2">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-green-800 p-3 rounded-lg"
          onPress={() => setIsLoading(true)}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 bg-white">
      <View className="mx-4 mt-8">
        {/* Search Bar */}
        <View className="flex-row items-center px-4 mb-4 border border-gray-300 rounded-lg h-10">
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1"
            placeholder="Search pharmacies"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
  
        {/* Toggle Switch */}
        <View className="flex-row items-center justify-between mb-4 mx-4">
          <Text className="text-sm font-medium text-gray-600">
            {showOnlyOnDuty ? 'Show On Duty Only' : 'Show All Pharmacies'}
          </Text>
          <Switch
            value={showOnlyOnDuty}
            onValueChange={setShowOnlyOnDuty}
            trackColor={{ false: "#767577", true: "#166534" }}
            thumbColor={showOnlyOnDuty ? "#ffffff" : "#f4f3f4"}
          />
        </View>
  
        {/* MapViewComponent */}
        <MapViewComponent
          currentLocation={currentLocation}
          youssoufiaCoords={YOUSSOUFIA_COORDS}
          filteredPharmacies={filteredPharmacies}
          onMarkerPress={handleMarkerPress}
          selectedPharmacy={selectedPharmacy}
        />
  
        {/* FlatList for Pharmacies */}
        <FlatList
          data={filteredPharmacies}
          keyExtractor={(item) => item.id}
          renderItem={renderPharmacyItem}
          contentContainerStyle={{ paddingBottom: 16 }} // Add padding to avoid overlap
        />
      </View>
    </View>
  </SafeAreaView>
  );
};

export default NearbyPlaces;


