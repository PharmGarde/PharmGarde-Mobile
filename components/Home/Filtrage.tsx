import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList, SafeAreaView } from 'react-native';
import images from '@/constants/image';
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import CardPharmacy from './CardPharmacy';
import apiClient from '@/config/axios';

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
                let results = await axios.get(`http://172.16.8.207:3000/pharmacy`);
                console.log("results.data",results.data);
                if (results?.data) {
                    for (let i = 0; i < results.data.length; i++) {
                        if (results.data[i].weekendshift == true) {
                            // console.log('yeyyeyeye', results.data[i]);
                            setWeekendShiftData((prevState) => [...prevState, results.data[i]]);
                        }
                        if (results.data[i].nightshift == true) {
                            setNightShiftData((prevState) => [...prevState, results.data[i]]);
                        }
                    }
                }
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
        specialShift();
    }, [])
    console.log('check the state', weekendShiftData.length);
    return (
        <View className="w-full bg-[#007f5f] p-4 rounded-md ">
            <Text className='text-white font-rubik-bold text-center text-xl'>Let dive to the Duty pharmacies</Text>
            <Text className="font-rubik-medium text-center  text-white py-5">
                Choose your preference: {'\n'} <Text className='font-rubik-bold text-lg'> we've got you covered anytime!</Text>
            </Text>
            <View className="flex-row justify-around p-2 bg-gray-100 rounded-lg ">
                <TouchableOpacity onPress={() => setSelectedOption('nearby')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'nearby' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>
                    <Text className="text-gray-800 font-medium">Near Me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedOption('weekend')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'weekend' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>
                    <Text className="text-gray-800 font-medium"> Weekend shift</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedOption('night')} className={`p-3 rounded-md justify-center items-center ${selectedOption === 'night' ? 'bg-[#007f5f9d]' : 'bg-gray-200'}`}>

                    <Text className="text-gray-800 font-medium">Night Shift </Text>
                </TouchableOpacity>
            </View>
            {selectedOption == "nearby" && (
                <View className='!bg-gray-100 mt-2 rounded-md flex flex-row gap-4 p-2'>
                    <View>
                        <Image source={images.pharmacyIllustration} className="w-32 h-32" resizeMode="contain" />
                    </View>
                    <View className='w-7/12'>
                        <Text className='font-rubik-bold text-gray-600'>Luis Gentil</Text>
                        <Text className='ml-2'>Pharamcy that offer a lot of services</Text>
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
            )}
            {selectedOption == "weekend" && (
                <>
                    {weekendShiftData.length > 0 ? (
                        <>
                            <View>
                                <FlatList
                                    data={weekendShiftData}
                                    renderItem={({ item }) => <CardPharmacy dataPharmacy={item} />}
                                    keyExtractor={item => item._id}
                                />
                            </View>
                        </>
                    ) : (
                        <View className='bg-gray-200 mt-5 py-6 rounded-lg'>
                            <Text className='font-rubik-bold text-center flex justify-center items-center'>
                                No weekend shift availableee
                            </Text>
                            <Text>{weekendShiftData.length}</Text>
                        </View>

                    )}
                </>
            )}
            {selectedOption == "night" && (
                <>
                    {nightShiftData.length > 0 ? (
                        <>
                            <View>
                                <FlatList
                                    data={nightShiftData}
                                    renderItem={({ item }) => <CardPharmacy dataPharmacy={item} />}
                                    keyExtractor={item => item._id} />
                            </View>
                        </>
                    ) : (
                        <View className='bg-gray-200 mt-5 py-6 rounded-lg'>
                            <Text className='font-rubik-bold text-center flex justify-center items-center'>
                                No night shift available

                            </Text>
                        
                        </View>

                    )}
                </>

            )}
        </View>
    )
}