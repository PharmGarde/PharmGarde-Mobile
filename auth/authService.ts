import {
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  resendSignUpCode,
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  getCurrentUser,
  signOut as amplifySignOut,
} from "@aws-amplify/auth";

export const authService = {
  confirmSignUp: async (username: string, code: string) => {
    return confirmSignUp({ username, confirmationCode: code });
  },

  resendConfirmationCode: async (username: string) => {
    return resendSignUpCode({ username });
  },

  forgotPassword: async (username: string) => {
    return resetPassword({ username });
  },

  confirmForgotPassword: async (
    username: string,
    code: string,
    newPassword: string
  ) => {
    return confirmResetPassword({
      username,
      confirmationCode: code,
      newPassword,
    });
  },

  signIn: async (username: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", username);
      const user = await amplifySignIn({ username, password });
      console.log("Sign-in successful. User:", user);
      return user;
    } catch (error: any) {
      console.error("Sign-in error in authService:", {
        name: error.name, // Error name
        code: error.code, // AWS Cognito error code
        message: error.message, // Error message
        underlyingError: error.underlyingError, // Underlying error details
        stack: error.stack, // Error stack trace
      });

      // Handle specific Cognito errors
      switch (error.code) {
        case "UserNotFoundException":
          throw new Error("User not found. Please check your username.");
        case "NotAuthorizedException":
          throw new Error("Incorrect username or password.");
        case "UserNotConfirmedException":
          throw new Error("User not confirmed. Please confirm your account.");
        default:
          throw new Error("An unknown error occurred during sign-in.");
      }
    }
  },

  signUp: async (params: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
  }) => {
    return amplifySignUp({
      username: params.username,
      password: params.password,
      options: {
        userAttributes: {
          email: params.email,
          given_name: params.given_name,
          family_name: params.family_name,
          phone_number: params.phone_number,
        },
      },
    });
  },

  getCurrentUser: async () => {
    return getCurrentUser();
  },

  signOut: async () => {
    return amplifySignOut();
  },
};
