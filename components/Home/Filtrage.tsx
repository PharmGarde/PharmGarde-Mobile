import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, Image, FlatList, SafeAreaView, ScrollView} from 'react-native';
import images from '@/constants/image';
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import CardPharmacy from './CardPharmacy';
import NearbyPlaces from "@/app/(app)/geolocalisation";
import { router } from 'expo-router';

interface dataPharmacy {
    _id: string,
    address: string,
    name: string,
    nightshift: boolean,
    weekendshift: boolean,
    phoneNumber: string,
    openingHoursNight: string
}

export default function Filtrage() {
    const [selectedOption, setSelectedOption] = useState('nearby');
    const [nightShiftData, setNightShiftData] = useState<dataPharmacy[]>([]);
    const [weekendShiftData, setWeekendShiftData] = useState<dataPharmacy[]>([]);

    useEffect(() => {
        async function specialShift() {
            try {
                const results = await axios.get(`http://192.168.0.131:3000/pharmacy`);
                if (results?.data) {
                    const weekend = results.data.filter((item: dataPharmacy) => item.weekendshift);
                    const night = results.data.filter((item: dataPharmacy) => item.nightshift);

                    setWeekendShiftData(weekend);
                    setNightShiftData(night);
                }
            } catch (e) {
                console.error(e);
            }
        }
        specialShift();
    }, []);

    return (
        <View className="w-full bg-[#007f5f] p-4 rounded-md">
            <Text className='text-white font-rubik-bold text-center text-xl'>Let's dive into the Duty pharmacies</Text>
            <Text className="font-rubik-medium text-center text-white py-5">
                Choose your preference: {'\n'} <Text className='font-rubik-bold text-lg'>we've got you covered anytime!</Text>
            </Text>
            <View className="flex-row justify-around p-2 bg-gray-100 rounded-lg">
                <TouchableOpacity onPress={() => setSelectedOption('nearby')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'nearby' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>
                    <Text className="text-gray-800 font-medium">Near Me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedOption('weekend')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'weekend' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>
                    <Text className="text-gray-800 font-medium">Weekend shift</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedOption('night')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'night' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>
                    <Text className="text-gray-800 font-medium">Night Shift</Text>
                </TouchableOpacity>
            </View>

            {selectedOption === "nearby" && (
<ScrollView className="mt-2">
    <View className='bg-gray-100 rounded-md p-4'>
        <View className='flex-row gap-4'>
            <Image
                source={images.pharmacyIllustration}
                className="w-32 h-32"
                resizeMode="contain"
            />
            <View className='flex-1'>
                <Text className='font-rubik-bold text-lg text-gray-600 mb-1'>Luis Gentil</Text>
                <Text className='text-gray-500 mb-4'>Pharmacy that offers a lot of services</Text>
                <View className='flex-row justify-between'>
                    <TouchableOpacity className="bg-green-100 shadow-sm rounded-full flex-1 mr-2 py-3">
                        <View className="flex-row justify-center items-center">
                            <Ionicons name="eye-outline" size={20} color="#007f5f" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-green-100 shadow-sm rounded-full flex-1 ml-2 py-3" 
                     onPress={() => {
                        router.push("/(app)/geolocalisation");
                        
                      }}>
                        <View className="flex-row justify-center items-center">
                            <Ionicons name="compass-outline" size={20} color="#007f5f" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      
    </View>
</ScrollView>
            )}

            {selectedOption === "weekend" && (
                <>
                    {weekendShiftData.length > 0 ? (
                        <View>
                            <FlatList
                                data={weekendShiftData}
                                renderItem={({ item }) => <CardPharmacy dataPharmacy={item} />}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    ) : (
                        <View className='bg-gray-200 mt-5 py-6 rounded-lg'>
                            <Text className='font-rubik-bold text-center'>
                                No weekend shift available
                            </Text>
                        </View>
                    )}
                </>
            )}

            {selectedOption === "night" && (
                <>
                    {nightShiftData.length > 0 ? (
                        <View>
                            <FlatList
                                data={nightShiftData}
                                renderItem={({ item }) => <CardPharmacy dataPharmacy={item} />}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    ) : (
                        <View className='bg-gray-200 mt-5 py-6 rounded-lg'>
                            <Text className='font-rubik-bold text-center'>
                                No night shift available
                            </Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}