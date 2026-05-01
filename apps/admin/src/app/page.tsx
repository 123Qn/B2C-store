import { isLoggedIn } from "../utils/auth";
import AdminScreen from "./AdminScreen";
import LoginScreen from "./LoginScreen";

export default async function Home() {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return <AdminScreen />;
}