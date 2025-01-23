import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ContactUs() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Add logic to send message
    console.log("Sending message...");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Contact Us</Text>
        </View>
      </View>

      {/* Form */}
      <View className="px-6 py-6 space-y-6">
        <View>
          <Text className="text-sm text-gray-500 mb-1">Your Message</Text>
          <TextInput
            className="w-full h-32 px-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Type your message here..."
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full h-12 bg-primary rounded-lg justify-center items-center"
          onPress={handleSendMessage}
        >
          <Text className="text-white font-semibold text-lg">Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
