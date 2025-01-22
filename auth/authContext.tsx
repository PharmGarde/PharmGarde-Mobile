import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "./authService";
import { getCurrentUser, signOut as amplifySignOut } from "@aws-amplify/auth";

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
      const user = await getCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Use authService.signIn
  const handleSignIn = async (username: string, password: string) => {
    try {
      const signInResult = await authService.signIn(username, password);
      if (signInResult.isSignedIn) {
        const user = await getCurrentUser();
        setUser(user);
        setIsAuthenticated(true);
      }
      return signInResult;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  };

  // Use authService.signUp
  const handleSignUp = async ({
    username,
    password,
    email,
    given_name,
    family_name,
    phone_number,
  }: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
  }) => {
    try {
      const signUpResult = await authService.signUp({
        username,
        password,
        email,
        given_name,
        family_name,
        phone_number,
      });
      return signUpResult;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  const handleForgotPassword = async (username: string) => {
    try {
      await authService.forgotPassword(username);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  const handleResetPassword = async (
    username: string,
    code: string,
    newPassword: string
  ) => {
    try {
      await authService.confirmForgotPassword(username, code, newPassword);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};