import { View, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import images from "@/constants/image";
import { useState } from "react";
import { useRouter } from 'expo-router';


export default function CardPharmacy({ dataPharmacy }: any) {
    const router = useRouter();
    function handleClickPharmacy() {
        router.push({
            pathname: '/DetailsPage',
            params: { pharmacy: JSON.stringify(dataPharmacy) }
        });
    }

    return (
        <View className='!bg-gray-100 mt-2 rounded-md flex flex-row gap-4 p-2'>
            <View className='w-7/12'>
                <Text className='font-rubik-bold text-gray-600'>{dataPharmacy.name}</Text>
                <Text className='ml-2'>{dataPharmacy.phoneNumber}</Text>
                <View className='flex flex-row justify-between'>
                    <TouchableOpacity onPress={handleClickPharmacy} className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
                        <View className="flex flex-row items-center justify-center">
                            <Ionicons className="text-white" name="eye-outline" />
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
    )
}