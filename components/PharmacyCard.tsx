import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface PharmacyCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  onRemove: (id: string) => void;
}

export const PharmacyCard: React.FC<PharmacyCardProps> = ({
  id,
  name,
  location,
  image,
  onRemove,
}) => {
  return (
    <View style={styles.pharmacyItem}>
      <View style={styles.pharmacyInfo}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.pharmacyImage}
            defaultSource={require('@/assets/images/default-pharmacy.jpg')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.pharmacyName}>{name}</Text>
          <View style={styles.locationContainer}>
            <IconSymbol name="mappin" size={14} color={Colors.light.icon} />
            <Text style={styles.pharmacyLocation}>{location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(id)}
      >
        <IconSymbol name="trash" size={20} color={Colors.light.background} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pharmacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  pharmacyInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  imageContainer: { marginRight: 12 },
  pharmacyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  textContainer: { flex: 1 },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
