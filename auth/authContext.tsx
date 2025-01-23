import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { authService } from "./authService";
import { router } from "expo-router";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  signIn: (username: string, password: string) => Promise<any>;
  signUp: (params: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
  }) => Promise<any>;
  signOut: () => Promise<void>;
  forgotPassword: (username: string) => Promise<void>;
  resetPassword: (
    username: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
  resendConfirmationCode: (username: string) => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (accessToken) {
        const currentUser = await authService.getCurrentUser(accessToken);
        const decodedUser = await authService.decodeToken(accessToken);

        // Combine decoded user info with attributes
        const userWithAttributes = {
          ...decodedUser,
          attributes: currentUser.attributes,
        };

        setUser(userWithAttributes);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.signIn(username, password);
      await SecureStore.setItemAsync("accessToken", user.AccessToken);
      await SecureStore.setItemAsync("idToken", user.IdToken);
      await SecureStore.setItemAsync("refreshToken", user.RefreshToken);

      const decodedUser = await authService.decodeToken(user.AccessToken);
      setUser(decodedUser);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (params: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
  }) => {
    setIsLoading(true);
    try {
      const signUpResult = await authService.signUp(params);

      // Redirect to confirm sign-up page
      router.push({
        pathname: "/confirm-signup",
        params: { username: params.username },
      });

      return signUpResult;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("idToken");
      await SecureStore.deleteItemAsync("refreshToken");

      setUser(null);
      setIsAuthenticated(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (username: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(username);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (
    username: string,
    code: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    try {
      await authService.confirmForgotPassword(username, code, newPassword);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async (username: string, code: string) => {
    setIsLoading(true);
    try {
      await authService.confirmSignUp(username, code);
    } catch (error) {
      console.error("Confirm sign-up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmationCode = async (username: string) => {
    setIsLoading(true);
    try {
      await authService.resendConfirmationCode(username);
    } catch (error) {
      console.error("Resend confirmation code error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        forgotPassword: handleForgotPassword,
        resetPassword: handleResetPassword,
        resendConfirmationCode: handleResendConfirmationCode,
        confirmSignUp: handleConfirmSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
