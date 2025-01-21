import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../auth/authContext";
import { StatusBar } from "expo-status-bar";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    given_name: "",
    family_name: "",
    phone_number: "",
    picture: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    given_name: "",
    family_name: "",
    phone_number: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      password: "",
      email: "",
      given_name: "",
      family_name: "",
      phone_number: "",
      general: "",
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // First Name validation
    if (!formData.given_name.trim()) {
      newErrors.given_name = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.family_name.trim()) {
      newErrors.family_name = "Last name is required";
      isValid = false;
    }

    // Phone Number validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp(formData);
      if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        router.push({
          pathname: "/confirm-signup",
          params: { username: formData.username },
        });
      }
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderInput = (
    field: string,
    label: string,
    placeholder: string,
    options: any = {}
  ) => (
    <View style={{ marginBottom: 20 }}>
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}*</Text>
      <TextInput
        style={{ marginTop: 5 }}
        className={`w-full h-12 px-4 border rounded-lg bg-white ${
          errors[field] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(text) => handleInputChange(field, text)}
        editable={!isLoading}
        {...options}
      />
      {errors[field] ? (
        <Text className="text-red-500 text-sm mt-1">{errors[field]}</Text>
      ) : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 100,
          paddingBottom: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-dark mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-500">
              Sign up to get started
            </Text>
          </View>

          {/* General Error Message */}
          {errors.general ? (
            <Text className="text-red-500 text-sm mb-4">{errors.general}</Text>
          ) : null}

          {/* Form */}
          <View className="space-y-4">
            {renderInput("username", "Username", "Choose a username", {
              autoCapitalize: "none",
            })}

            {renderInput("email", "Email", "Enter your email", {
              keyboardType: "email-address",
              autoCapitalize: "none",
            })}

            {renderInput("password", "Password", "Create a password", {
              secureTextEntry: true,
            })}

            {renderInput("given_name", "First Name", "Enter your first name")}

            {renderInput("family_name", "Last Name", "Enter your last name")}

            {renderInput(
              "phone_number",
              "Phone Number",
              "Enter your phone number",
              {
                keyboardType: "phone-pad",
              }
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              className={`h-12 rounded-lg justify-center items-center ${
                isLoading ? "bg-primary/70" : "bg-primary"
              }`}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              className="flex-row justify-center items-center py-4"
              onPress={() => router.push("/sign-in")}
              disabled={isLoading}
            >
              <Text className="text-gray-600">Already have an account? </Text>
              <Text className="text-primary font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
