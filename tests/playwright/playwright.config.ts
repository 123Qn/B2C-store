import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";
import fs from "fs";
import path from "path";

const authDir = path.resolve(".auth");
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir);
  console.log(".auth directory created");
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [["list"]],

  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    testIdAttribute: "data-testid",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      testDir: "./tests/web",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3001",
      },
      dependencies: ["setup"],
    },
  ],

  // webServer: [...] ← commented out, start servers manually
});