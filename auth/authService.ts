import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { awsConfig } from "./authConfig";

const COGNITO_DOMAIN = `https://cognito-idp.${awsConfig.Cognito.region}.amazonaws.com`;

// Helper function to make API requests to Cognito
const cognitoRequest = async (action: string, body: any) => {
  try {
    const response = await axios.post(COGNITO_DOMAIN, body, {
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": `AWSCognitoIdentityProviderService.${action}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Cognito request error:", errorMessage);

    // Map Cognito error codes to user-friendly messages
    if (error.response?.data?.__type) {
      switch (error.response.data.__type) {
        case "NotAuthorizedException":
          throw new Error("Invalid credentials");
        case "UserNotFoundException":
          throw new Error("User not found");
        case "CodeMismatchException":
          throw new Error("Invalid verification code");
        case "ExpiredCodeException":
          throw new Error("Verification code has expired");
        case "LimitExceededException":
          throw new Error("Attempt limit exceeded, please try again later");
        case "UsernameExistsException":
          throw new Error("Username already exists");
        case "AliasExistsException":
          throw new Error("Email already exists");
        default:
          throw new Error(errorMessage);
      }
    } else {
      throw new Error(errorMessage);
    }
  }
};

export const authService = {
  // Login
  signIn: async (username: string, password: string) => {
    const body = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: awsConfig.Cognito.userPoolClientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    try {
      const response = await cognitoRequest("InitiateAuth", body);
      return response.AuthenticationResult;
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  },

  decodeToken: async (token: string) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Sign Up
  signUp: async (params: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
  }) => {
    // Check if the username or email already exists
    try {
      // Attempt to sign up the user
      const body = {
        ClientId: awsConfig.Cognito.userPoolClientId,
        Username: params.username,
        Password: params.password,
        UserAttributes: [
          { Name: "email", Value: params.email },
          { Name: "given_name", Value: params.given_name },
          { Name: "family_name", Value: params.family_name },
          { Name: "phone_number", Value: params.phone_number },
        ],
      };

      const response = await cognitoRequest("SignUp", body);
      return response; // Contains UserSub, etc.
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      throw error; // This will throw the user-friendly error message
    }
  },

  // Confirm Sign Up
  confirmSignUp: async (username: string, code: string) => {
    const body = {
      ClientId: awsConfig.Cognito.userPoolClientId,
      Username: username,
      ConfirmationCode: code,
    };

    try {
      const response = await cognitoRequest("ConfirmSignUp", body);
      return response;
    } catch (error: any) {
      console.error("Confirm sign-up error:", error.message);
      throw error;
    }
  },

  // Forgot Password
  forgotPassword: async (username: string) => {
    const body = {
      ClientId: awsConfig.Cognito.userPoolClientId,
      Username: username,
    };

    try {
      const response = await cognitoRequest("ForgotPassword", body);
      return response;
    } catch (error: any) {
      console.error("Forgot password error:", error.message);
      throw error;
    }
  },

  // Confirm Forgot Password
  confirmForgotPassword: async (
    username: string,
    code: string,
    newPassword: string
  ) => {
    const body = {
      ClientId: awsConfig.Cognito.userPoolClientId,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
    };

    try {
      const response = await cognitoRequest("ConfirmForgotPassword", body);
      return response;
    } catch (error: any) {
      console.error("Confirm forgot password error:", error.message);
      throw error;
    }
  },

  // Resend Confirmation Code
  resendConfirmationCode: async (username: string) => {
    const body = {
      ClientId: awsConfig.Cognito.userPoolClientId,
      Username: username,
    };

    try {
      const response = await cognitoRequest("ResendConfirmationCode", body);
      return response;
    } catch (error: any) {
      console.error("Resend confirmation code error:", error.message);
      throw error;
    }
  },

  // Get Current User
  getCurrentUser: async (accessToken: string) => {
    const body = {
      AccessToken: accessToken,
    };

    try {
      const response = await cognitoRequest("GetUser", body);

      // Convert the UserAttributes array into an object
      const userAttributes = response.UserAttributes.reduce(
        (acc: any, attr: any) => {
          acc[attr.Name] = attr.Value;
          return acc;
        },
        {}
      );

      return {
        username: response.Username,
        attributes: userAttributes,
      };
    } catch (error: any) {
      console.error("Error fetching current user:", error.message);
      throw error;
    }
  },

  // Sign Out (Not directly supported by Cognito API; requires token invalidation)
  signOut: async () => {
    throw new Error("signOut is not implemented for direct Cognito API usage.");
  },
};