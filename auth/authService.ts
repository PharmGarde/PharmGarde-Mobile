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
    console.error(
      "Cognito request error:",
      error.response?.data || error.message
    );
    throw error;
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
      console.error("Sign-in error:", error.response?.data || error.message);
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

    try {
      const response = await cognitoRequest("SignUp", body);
      return response; // Contains UserSub, etc.
    } catch (error: any) {
      console.error("Sign-up error:", error.response?.data || error.message);
      throw error;
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
      console.error(
        "Confirm sign-up error:",
        error.response?.data || error.message
      );
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
      console.error(
        "Forgot password error:",
        error.response?.data || error.message
      );
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
      console.error(
        "Confirm forgot password error:",
        error.response?.data || error.message
      );
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
      console.error(
        "Resend confirmation code error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get Current User (Not directly supported by Cognito API; requires token validation)
  getCurrentUser: async () => {
    throw new Error(
      "getCurrentUser is not implemented for direct Cognito API usage."
    );
  },

  // Sign Out (Not directly supported by Cognito API; requires token invalidation)
  signOut: async () => {
    throw new Error("signOut is not implemented for direct Cognito API usage.");
  },
};
