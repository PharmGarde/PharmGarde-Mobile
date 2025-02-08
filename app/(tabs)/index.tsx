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
        <Filtrage/>
      </SafeAreaView>
    </View>
  )
}

export default Home