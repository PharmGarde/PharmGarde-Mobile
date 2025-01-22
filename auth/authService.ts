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
    return amplifySignIn({ username, password });
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