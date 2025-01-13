import { 
    confirmSignUp, 
    resetPassword,
    confirmResetPassword,
    resendSignUpCode
  } from '@aws-amplify/auth';
  
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
        newPassword
      });
    },
  };
  