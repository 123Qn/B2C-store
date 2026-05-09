import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import { client } from "@repo/db/client";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <AppLayout>
      <Main className={styles.main} />
    </AppLayout>
  );
}