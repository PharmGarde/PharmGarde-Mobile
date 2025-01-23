import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../auth/authContext";

interface GuardedRouteProps {
  children: React.ReactNode;
}

export default function GuardedRoute({ children }: GuardedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <>{children}</>;
}
