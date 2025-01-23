import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define a type for valid Ionicons names
type IoniconsName = "person-circle-outline" | "card-outline" | "settings-outline" | "bug-outline";

// Define the help topics with typed icon names
const helpTopics: { title: string; icon: IoniconsName }[] = [
  { title: "Account Issues", icon: "person-circle-outline" },
  { title: "Payment Problems", icon: "card-outline" },
  { title: "App Features", icon: "settings-outline" },
  { title: "Report a Bug", icon: "bug-outline" },
];

export default function HelpCenter() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Help Center</Text>
        </View>
      </View>

      {/* Help Topics */}
      <View className="px-6 py-6 space-y-4">
        {helpTopics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 bg-gray-50 rounded-lg"
          >
            <Ionicons name={topic.icon} size={24} color="#374151" />
            <Text className="text-base text-gray-900 ml-4">{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}