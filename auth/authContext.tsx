import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "./authService";

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
      const user = await authService.getCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.signIn(username, password);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setIsAuthenticated(false);
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};