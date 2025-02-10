export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Pharmacy {
  id: string;
  _id?: string; // For API compatibility
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  isOnDuty?: boolean;
  nightshift?: boolean;
  weekendshift?: boolean;
  openingHoursNight?: string;
}

