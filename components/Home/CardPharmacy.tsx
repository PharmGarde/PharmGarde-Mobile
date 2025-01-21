import {View,Image, Text,TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import images from "@/constants/image";

export default function CardPharmacy({dataPharmacy}: any){
    return(
        <View className='!bg-gray-100 mt-2 rounded-md flex flex-row gap-4 p-2'>
        <View>
            <Image source={images.pharmacyIllustration} className="w-32 h-32" resizeMode="contain" />
        </View>
        <View className='w-7/12'>
            <Text className='font-rubik-bold text-gray-600'>{dataPharmacy.name}</Text>
            <Text className='ml-2'>{dataPharmacy.phoneNumber}</Text>
            <View className='flex flex-row justify-between'>
                <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
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