import { Amplify } from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_RE9flZGIA",
      userPoolClientId: "29n44633lbi3jcjq46ho2d2jih",
      region: "eu-north-1",
    },
  },
  storage: AsyncStorage,
  Logging: {
    level: "DEBUG",
  },
};

Amplify.configure(awsConfig);
