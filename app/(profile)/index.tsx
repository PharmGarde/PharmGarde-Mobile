import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useAuth } from "../../auth/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";

// Define a custom type for the decoded token
interface CustomJwtPayload {
  email?: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
  picture?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  // Decode the ID token to access user attributes
  const idToken = user?.signInUserSession?.idToken?.jwtToken;
  const decodedToken = idToken ? (jwtDecode(idToken) as CustomJwtPayload) : null;

  // Extract user attributes from the decoded token
  const email = decodedToken?.email || "N/A";
  const givenName = decodedToken?.given_name || "N/A";
  const familyName = decodedToken?.family_name || "N/A";
  const phoneNumber = decodedToken?.phone_number || "N/A";
  const username = user?.username || "N/A";

  console.log(user.idToken);
  

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
          <TouchableOpacity
            onPress={() => router.push("/(profile)/settings")}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Ionicons name="settings-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Picture */}
      <View className="items-center mt-8">
        <View className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
          {decodedToken?.picture ? (
            <Image
              source={{ uri: decodedToken.picture }}
              className="w-full h-full"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
          )}
        </View>
        <TouchableOpacity className="mt-4">
          <Text className="text-primary font-medium">Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View className="px-6 mt-8 space-y-6">
        {/* Full Name */}
        <View className="bg-gray-50 p-4 rounded-xl">
          <Text className="text-sm text-gray-500 mb-1">Full Name</Text>
          <Text className="text-lg font-medium">
            {givenName} {familyName}
          </Text>
        </View>

        {/* Email */}
        <View className="bg-gray-50 p-4 rounded-xl">
          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          <Text className="text-lg font-medium">{email}</Text>
        </View>

        {/* Phone Number */}
        <View className="bg-gray-50 p-4 rounded-xl">
          <Text className="text-sm text-gray-500 mb-1">Phone Number</Text>
          <Text className="text-lg font-medium">{phoneNumber}</Text>
        </View>

        {/* Username */}
        <View className="bg-gray-50 p-4 rounded-xl">
          <Text className="text-sm text-gray-500 mb-1">Username</Text>
          <Text className="text-lg font-medium">{username}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity className="mx-6 mt-8 bg-primary p-4 rounded-xl">
        <Text className="text-white text-center font-semibold text-lg">
          Edit Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}