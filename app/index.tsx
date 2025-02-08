import { Redirect } from "expo-router";
import { useAuth } from "../auth/authContext";
import "../global.css";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(home)" />;
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
}
