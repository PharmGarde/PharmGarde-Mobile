export type Coordinates = {
    latitude: number;
    longitude: number;
  };
  

export  type Pharmacy = {
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