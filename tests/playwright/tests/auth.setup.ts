import { test as setup } from "@playwright/test";
import fs from "fs";

const API_URL = process.env.API_URL || "http://localhost:3000";

setup(
  "authenticate assignment 3",
  { tag: "@a3" },
  async ({ playwright }) => {
    const authFile = ".auth/user.json";

    const apiContext = await playwright.request.newContext({
      baseURL: API_URL,
    });

    await apiContext.post("/api/auth", {
      data: JSON.stringify({ 
        email: "buyer@gmail.com",  // ← ADD email
        password: "123" 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await apiContext.storageState({ path: authFile });
  },
);