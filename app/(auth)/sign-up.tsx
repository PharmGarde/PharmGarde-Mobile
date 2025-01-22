//@ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../auth/authContext";
import { useTranslation } from "react-i18next";
import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import Navbar from "@/components/Navbar";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string; // Add confirmPassword field
  email: string;
  given_name: string;
  family_name: string;
  phone_number: string;
  picture: string;
}

interface FormErrors {
  username: string;
  password: string;
  confirmPassword: string; // Add confirmPassword error field
  email: string;
  given_name: string;
  family_name: string;
  phone_number: string;
  general: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "", // Initialize confirmPassword
    email: "",
    given_name: "",
    family_name: "",
    phone_number: "",
    picture: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
    confirmPassword: "", // Initialize confirmPassword error
    email: "",
    given_name: "",
    family_name: "",
    phone_number: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLayoutDirection();
  const router = useRouter();
  const { signUp } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {
      username: "",
      password: "",
      confirmPassword: "", // Initialize confirmPassword error
      email: "",
      given_name: "",
      family_name: "",
      phone_number: "",
      general: "",
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "tooShort";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "mismatch";
      isValid = false;
    }

    // First Name validation
    if (!formData.given_name.trim()) {
      newErrors.given_name = "required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.family_name.trim()) {
      newErrors.family_name = "required";
      isValid = false;
    }

    // Phone Number validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "required";
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
      // Call the signUp function from useAuth
      const result = await signUp({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        given_name: formData.given_name,
        family_name: formData.family_name,
        phone_number: formData.phone_number,
      });

      // Redirect to confirm sign-up page if necessary
      if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        router.push({
          pathname: "/confirm-signup",
          params: { username: formData.username },
        });
      }
    } catch (error: any) {
      // Handle errors
      setErrors((prev) => ({
        ...prev,
        general: error.message || t("validation.general.error"),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderInput = (
    field: keyof FormData,
    label: string,
    placeholder: string,
    options: any = {}
  ) => (
    <View style={{ marginBottom: 20 }}>
      <Text
        className={`text-sm font-medium text-gray-700 mb-1 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {label}*
      </Text>
      <TextInput
        className={`w-full h-12 px-4 border rounded-lg bg-white ${
          errors[field] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={formData[field]}
        onChangeText={(text) => handleInputChange(field, text)}
        editable={!isLoading}
        {...options}
      />
      {errors[field] ? (
        <Text
          className={`text-red-500 text-sm mt-1 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t(`validation.${field}.${errors[field]}`)}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Navbar />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-6">
          <View className="w-full max-w-sm mx-auto">
            {/* Header */}
            <View className={`mb-8 ${isRTL ? "items-end" : "items-start"}`}>
              <Text
                className={`text-3xl font-bold text-gray-800 mb-2 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("signUp.createAccount")}
              </Text>
              <Text
                className={`text-base text-gray-500 ${
                  isRTL ? "text-right" : "text-left"
                } w-full`}
              >
                {t("signUp.getStarted")}
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4 w-full">
              {errors.general ? (
                <Text
                  className={`text-red-500 text-sm mb-4 ${
                    isRTL ? "text-right" : "text-left"
                  } w-full`}
                >
                  {t("validation.general.error")}
                </Text>
              ) : null}

              {renderInput(
                "username",
                t("signUp.username"),
                t("signUp.enterUsername"),
                {
                  autoCapitalize: "none",
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {renderInput(
                "given_name",
                t("signUp.firstName"),
                t("signUp.enterFirstName"),
                {
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {renderInput(
                "family_name",
                t("signUp.lastName"),
                t("signUp.enterLastName"),
                {
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {renderInput("email", t("signUp.email"), t("signUp.enterEmail"), {
                keyboardType: "email-address",
                autoCapitalize: "none",
                style: {
                  marginTop: 5,
                  textAlign: isRTL ? "right" : "left",
                  writingDirection: isRTL ? "rtl" : "ltr",
                },
              })}

              {renderInput(
                "phone_number",
                t("signUp.phoneNumber"),
                t("signUp.enterPhoneNumber"),
                {
                  keyboardType: "phone-pad",
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {renderInput(
                "password",
                t("signUp.password"),
                t("signUp.createPassword"),
                {
                  secureTextEntry: true,
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {/* Add Confirm Password Field */}
              {renderInput(
                "confirmPassword",
                t("signUp.confirmPassword"),
                t("signUp.confirmPasswordPlaceholder"),
                {
                  secureTextEntry: true,
                  style: {
                    marginTop: 5,
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                  },
                }
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                className={`w-full h-12 rounded-lg justify-center items-center mt-6 ${
                  isLoading ? "bg-primary/70" : "bg-primary"
                }`}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {t("signUp.signUp")}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Sign In Link */}
              <View
                className={`flex-row justify-center items-center mt-6 mb-6 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Text className="text-gray-600">
                  {t("signUp.alreadyHaveAccount")}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-in")}
                  disabled={isLoading}
                >
                  <Text className="text-primary font-semibold">
                    {t("signUp.signIn")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
