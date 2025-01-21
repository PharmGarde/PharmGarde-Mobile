
// NearbyPlaces.tsx
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
} from 'react-native';
import * as Location from 'expo-location';
import { calculateDistance, callPharmacy } from '@/hooks/helpers/calculateDistance';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewComponent from '@/components/ui/MapViewComponent';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Pharmacy = {
  id: string;
  name: string;
  address: string;
  image: any;
  latitude: number;
  longitude: number;
  isOnDuty: boolean;
  openingHours: string;
  phoneNumber: string;
};

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
    phoneNumber: '+212522334455'
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
    phoneNumber: '+212522334456'
  },
];

const NearbyPlaces = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(false);

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

  const filteredPharmacies = PHARMACIES.filter((pharmacy) => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!showOnlyOnDuty || pharmacy.isOnDuty)
  );

  const openMapsWithDirections = async (pharmacy: Pharmacy) => {
    const destination = `${pharmacy.latitude},${pharmacy.longitude}`;
    const url = Platform.select({
      ios: `maps://app?saddr=Current+Location&daddr=${destination}`,
      android: `google.navigation:q=${destination}`
    });

    if (!url) return;

    try {
      const supported = await Linking.canOpenURL(url);
      const finalUrl = supported ? url : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
      await Linking.openURL(finalUrl);
    } catch (err) {
      setError('Could not open maps application');
    }
  };

  const renderPharmacyItem = ({ item }: { item: Pharmacy }) => (
    <View>
    <TouchableOpacity 
      className="border-b border-gray-200"
      onPress={() => openMapsWithDirections(item)}
    >
      <View className="flex-row p-4 ">
        <Image 
          source={item.image} 
          className="w-20 h-20 rounded-lg mr-4"
        />
        <View className="flex-1 justify-center">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-gray-600 mt-1">{item.address}</Text>
          <Text className={`font-medium mt-1 ${
            item.isOnDuty ? 'text-green-600' : 'text-red-600'
          }`}>
            {item.isOnDuty ? 'On Duty' : 'Off Duty'}
          </Text>
          <Text className="text-gray-600 mt-1">{item.openingHours}</Text>
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
      <ScrollView  className="flex-1 bg-white ">
        <View className="flex-1 bg-white">
          <TextInput
            className="h-10 mx-4 mt-8 px-4 border border-gray-300 rounded-lg"
            placeholder="Search pharmacies"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity
            className="mx-4 mt-2 mb-4 p-3 bg-green-800 rounded-lg"
            onPress={() => setShowOnlyOnDuty(!showOnlyOnDuty)}
          >
            <Text className="text-white text-center font-medium">
              {showOnlyOnDuty ? 'Show All' : 'Show Only On Duty'}
            </Text>
          </TouchableOpacity>

          <MapViewComponent
            currentLocation={currentLocation}
            youssoufiaCoords={YOUSSOUFIA_COORDS}
            filteredPharmacies={filteredPharmacies}
            openMapsWithDirections={openMapsWithDirections}
          />
         <View className="bg-white 
         shadow-lg rounded-lg shadow-gray-400">
          <FlatList
            className="flex-1"
            data={filteredPharmacies}
            keyExtractor={(item) => item.id}
            renderItem={renderPharmacyItem}
          />
          </View> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NearbyPlaces;
