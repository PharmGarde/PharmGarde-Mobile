import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import Navbar from '../../components/Navbar'
import images from '../../constants/image'
import { Ionicons } from '@expo/vector-icons'
import Filtrage from '@/components/Home/Filtrage'

function Home() {
  return (
    <View className="flex-1 bg-[#007f5f]">
      <SafeAreaView>
        <Navbar />
        {/* <View className="items-center px-5 py-4">
          <Text className="font-rubik-bold text-2xl text-[#007f5f] text-center">
            Find Your Nearest Duty Pharmacy Anytime, Anywhere
          </Text>
          <Text className="font-rubik-medium text-center">
            Whether it's late at night or during a holiday, we help you locate open pharmacies near you quickly and effortlessly.
          </Text>
          <View className="flex flex-row w-full justify-evenly">
            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
              <View className="flex flex-row items-center justify-center">
                <Image source={images.pharmacyIllustration} className="w-5 h-5" resizeMode="contain"/>
                <Text className="text-lg font-rubik-medium text-black-300 ml-2">Learn More</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 py-4 mt-5">
              <View className="flex flex-row items-center justify-center">
                <Ionicons name="golf-outline" />
                <Text className="text-lg font-rubik-medium text-black-300 ml-2">Near Me</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <Filtrage/>
 
      </SafeAreaView>
    </View>
  )
}

export default Home