import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';

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

type MapViewComponentProps = {
  currentLocation: Coordinates | null;
  youssoufiaCoords: Coordinates;
  filteredPharmacies: Pharmacy[];
  onMarkerPress: (pharmacy: Pharmacy) => void;
  selectedPharmacy: Pharmacy | null;
};

const MapViewComponent = ({
  currentLocation,
  youssoufiaCoords,
  filteredPharmacies,
  onMarkerPress,
  selectedPharmacy,
}: MapViewComponentProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (selectedPharmacy && currentLocation) {
      const fetchRoute = async () => {
        try {
          const response = await fetch(
            `http://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${selectedPharmacy.longitude},${selectedPharmacy.latitude}?overview=full&geometries=polyline`
          );
          const data = await response.json();

          if (data.routes && data.routes[0]) {
            const points = polyline.decode(data.routes[0].geometry);
            const coords = points.map((point) => ({
              latitude: point[0],
              longitude: point[1],
            }));
            setRouteCoordinates(coords);
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

      fetchRoute();
    } else {
      setRouteCoordinates([]);
    }
  }, [selectedPharmacy, currentLocation]);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude });
        }
      );
    };

    startTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const THIRTY_KM_DELTA = 0.27;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: youssoufiaCoords.latitude,
          longitude: youssoufiaCoords.longitude,
          latitudeDelta: THIRTY_KM_DELTA,
          longitudeDelta: THIRTY_KM_DELTA,
        }}
        showsUserLocation
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="My Current Location"
            description="You are here"
            pinColor="blue"
          />
        )}

        {filteredPharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
            title={pharmacy.name}
            description={pharmacy.address}
            pinColor={pharmacy.isOnDuty ? 'green' : 'red'}
            onPress={() => onMarkerPress(pharmacy)}
          />
        ))}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF0000"
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.5,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;










