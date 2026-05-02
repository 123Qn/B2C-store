import { isLoggedIn } from "../../../utils/auth";
import LoginScreen from "../../LoginScreen";
import CreateForm from "../../CreateForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) return <LoginScreen />;

  return <CreateForm />;
}