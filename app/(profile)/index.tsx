import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useAuth } from "../../auth/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  // Extract user attributes with proper fallbacks
  const email = user?.attributes?.email || "N/A";
  const givenName = user?.attributes?.given_name || "N/A";
  const familyName = user?.attributes?.family_name || "N/A";
  const phoneNumber = user?.attributes?.phone_number || "N/A";
  const username = user?.username || "N/A";

  // Add validation for required fields
  const isProfileComplete = Boolean(
    user?.attributes?.email &&
    user?.attributes?.given_name &&
    user?.attributes?.family_name
  );

  if (!isProfileComplete) {
    console.warn('Some profile information is missing from the token');
  }

  const handleEditProfile = () => {
    // Add your edit profile logic here
    console.log("Edit profile clicked");
  };

  const handleChangePhoto = () => {
    // Add your photo change logic here
    console.log("Change photo clicked");
  };

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
          {user?.attributes?.picture ? (
            <Image
              source={{ uri: user.attributes.picture }}
              className="w-full h-full"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
          )}
        </View>
        <TouchableOpacity className="mt-4" onPress={handleChangePhoto}>
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
      <TouchableOpacity 
        className="mx-6 mt-8 mb-8 bg-primary p-4 rounded-xl"
        onPress={handleEditProfile}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Edit Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}