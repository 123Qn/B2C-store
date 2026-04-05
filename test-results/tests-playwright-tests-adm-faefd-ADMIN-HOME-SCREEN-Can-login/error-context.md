# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\admin\home-screen.spec.ts >> ADMIN HOME SCREEN >> Can login
- Location: tests\playwright\tests\admin\home-screen.spec.ts:25:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | import { seed } from "@repo/db/seed";
  2  | import { expect, test } from "./fixtures";
  3  | 
  4  | test.beforeAll(async () => {
  5  |   await seed();
  6  | });
  7  | 
  8  | test.describe("ADMIN HOME SCREEN", () => {
  9  |   test(
  10 |     "Shows login screen",
  11 |     {
  12 |       tag: "@a2",
  13 |     },
  14 |     async ({ page }) => {
  15 |       await page.goto("/");
  16 |       await expect(page.getByText("Sign In", { exact: true })).toBeVisible();
  17 | 
  18 |       // HOME SCREEN > Shows Login screen if not logged
  19 |       await expect(
  20 |         page.getByText("Sign in to your account", { exact: true }),
  21 |       ).toBeVisible();
  22 |     },
  23 |   );
  24 | 
  25 |   test(
  26 |     "Can login",
  27 |     {
  28 |       tag: "@a2",
  29 |     },
  30 |     async ({ page }) => {
> 31 |       await page.goto("/");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  32 | 
  33 |       // HOME SCREEN > Authenticate the current client using a hard-coded password
  34 |       await page.getByLabel("Password", { exact: true }).fill("123");
  35 |       await page.getByText("Sign In", { exact: true }).click();
  36 | 
  37 |       await expect(page.getByRole("heading", { name: "Admin of Full Stack Blog" })).toBeVisible();
  38 | 
  39 |       // HOME SCREEN > Use a cookie to remember the signed-in state.
  40 |       const cookies = await page.context().cookies();
  41 |       const passwordCookie = cookies.find(
  42 |         (cookie) => cookie.name === "auth_token",
  43 |       );
  44 |       expect(passwordCookie).toBeDefined();
  45 | 
  46 |       // HOME SCREEN > There must be logout button
  47 |       await expect(page.getByText("Logout")).toBeVisible();
  48 | 
  49 |       //  HOME SCREEN > Clicking the logout button logs user out
  50 |       await page.getByText("Logout").click();
  51 | 
  52 |       await expect(await page.locator("article")).toHaveCount(0);
  53 |       await expect(page.getByText("Sign in to your account")).toBeVisible();
  54 |     },
  55 |   );
  56 | 
  57 |   test(
  58 |     "Shows home screen to authorised user",
  59 |     {
  60 |       tag: "@a2",
  61 |     },
  62 |     async ({ userPage }) => {
  63 |       await userPage.goto("/");
  64 | 
  65 |       // shows title
  66 |       await expect(
  67 |         userPage.getByText("Admin of Full Stack Blog", { exact: true }),
  68 |       ).toBeVisible();
  69 | 
  70 |       // LIST SCREEN > Article list is only accessible to logged-in users.
  71 |       await expect(await userPage.locator("article").count()).toBe(4);
  72 |     },
  73 |   );
  74 | });
  75 | 
```