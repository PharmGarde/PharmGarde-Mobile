import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import images from "@/constants/image"
import { useLocalSearchParams } from 'expo-router'
import Navbar from "@/components/Navbar"

export default function Details() {
    const params = useLocalSearchParams();
    const pharmacy = typeof params.pharmacy === 'string'
        ? JSON.parse(params.pharmacy)
        : params.pharmacy;

    // console.log('Weekend shift value:', pharmacy.weekendshift, typeof pharmacy.weekendshift);

    return (
        <>
            <Navbar />
            <View className="w-full h-full bg-[#007f5f] p-4 rounded-md ">

                <Text className="font-rubik-bold text-white text-center text-lg">Details of pharmacy</Text>
                <View className='!bg-gray-100 mt-2 rounded-md flex flex-row gap-4 p-2'>
                    <View>
                        <Image source={images.pharmacyIllustration} className="w-32 h-32" resizeMode="contain" />
                    </View>
                    <View className='w-7/12'>
                        <Text className='font-rubik-bold text-gray-600'>{pharmacy.name}</Text>
                        <Text className='ml-2'><Ionicons className="text-white" name="location-outline" /> {pharmacy.address}</Text>
                        <Text className='ml-2'><Ionicons className="text-white" name="call-outline" /> {pharmacy.phoneNumber}</Text>
                        {pharmacy.nightshift === true || pharmacy.nightshift === "true"
                        ? (
                            <>
                                <Text className='ml-2'><Ionicons className="text-white" name="moon-outline" /> We are working tonight</Text>
                                <Text className='ml-2'>
                                    <Ionicons className="text-white" name="calendar-outline" />
                                    {pharmacy.openingHoursNight || '8PM - 7AM'}
                                </Text>
                            </>
                        ) : (
                            <Text className='ml-2'><Ionicons className="text-white" name="moon-outline" /> No night shift</Text>
                        )}

                        {(pharmacy.weekendshift === true || pharmacy.weekendshift === "true") ? (
                            <Text className='ml-2'>
                                <Ionicons className="text-white" name="moon-outline" /> 
                                 We will be available this weekend
                            </Text>
                        ) : (
                            <Text className='ml-2'>
                                <Ionicons className="text-white" name="globe-outline" /> 
                                No weekend shift
                            </Text>
                        )}

                        <View className='flex flex-row justify-between'>
                            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
                                <View className="flex flex-row items-center justify-center">
                                    <Ionicons className="text-white" name="heart-circle-outline" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
                                <View className="flex flex-row items-center justify-center ">
                                    <Ionicons className="text-white" name="compass-outline" />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>


                </View>
            </View>

        </>
    )
}