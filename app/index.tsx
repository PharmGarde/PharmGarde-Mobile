import { Redirect } from "expo-router";
import { useAuth } from "../auth/authContext";
import "../global.css";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
