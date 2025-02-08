import { Amplify } from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_JGjhRBUsH", // Replace with your User Pool ID
      userPoolClientId: "raagmk5k89akn3hem7ilshji6", // Replace with your App Client ID
      region: "eu-north-1",
    },
  },
  storage: AsyncStorage,
  Logging: {
    level: "DEBUG", // Enable detailed logging
  },
};

Amplify.configure(awsConfig);