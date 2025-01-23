import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  type SignInOutput,
  type SignUpOutput,
} from "@aws-amplify/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  signIn: (username: string, password: string) => Promise<SignInOutput>;
  signUp: (params: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
    picture?: string;
  }) => Promise<SignUpOutput>;
  signOut: () => Promise<void>;
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

  const handleSignIn = async (username: string, password: string) => {
    try {
      const signInResult = await signIn({ username, password });
      if (signInResult.isSignedIn) {
        const user = await getCurrentUser();
        setUser(user);
        setIsAuthenticated(true);
      }
      return signInResult;
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async ({
    username,
    password,
    email,
    given_name,
    family_name,
    phone_number,
    picture,
  }: {
    username: string;
    password: string;
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
    picture?: string;
  }) => {
    try {
      const signUpResult = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            given_name,
            family_name,
            phone_number,
            ...(picture && { picture }),
          },
        },
      });
      return signUpResult;
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
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
