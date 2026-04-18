# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\admin\home-screen.spec.ts >> ADMIN HOME SCREEN >> Shows login screen
- Location: tests\playwright\tests\admin\home-screen.spec.ts:10:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | 
  2  | import { expect, test } from "./fixtures";
  3  | 
  4  | test.beforeAll(async () => {
  5  |   const { seed } = await import("@repo/db/seed");
  6  |   await seed();
  7  | });
  8  | 
  9  | test.describe("ADMIN HOME SCREEN", () => {
  10 |   test(
  11 |     "Shows login screen",
  12 |     {
  13 |       tag: "@a2",
  14 |     },
  15 |     async ({ page }) => {
> 16 |       await page.goto("/");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  17 |       await expect(page.getByText("Sign In", { exact: true })).toBeVisible();
  18 | 
  19 |       // HOME SCREEN > Shows Login screen if not logged
  20 |       await expect(
  21 |         page.getByText("Sign in to your account", { exact: true }),
  22 |       ).toBeVisible();
  23 |     },
  24 |   );
  25 | 
  26 |   test(
  27 |     "Can login",
  28 |     {
  29 |       tag: "@a2",
  30 |     },
  31 |     async ({ page }) => {
  32 |       await page.goto("/");
  33 | 
  34 |       // HOME SCREEN > Authenticate the current client using a hard-coded password
  35 |       await page.getByLabel("Password", { exact: true }).fill("123");
  36 |       await page.getByText("Sign In", { exact: true }).click();
  37 | 
  38 |       await expect(page.getByRole("heading", { name: "Admin of Full Stack Blog" })).toBeVisible();
  39 | 
  40 |       // HOME SCREEN > Use a cookie to remember the signed-in state.
  41 |       const cookies = await page.context().cookies();
  42 |       const passwordCookie = cookies.find(
  43 |         (cookie) => cookie.name === "auth_token",
  44 |       );
  45 |       expect(passwordCookie).toBeDefined();
  46 | 
  47 |       // HOME SCREEN > There must be logout button
  48 |       await expect(page.getByText("Logout")).toBeVisible();
  49 | 
  50 |       //  HOME SCREEN > Clicking the logout button logs user out
  51 |       await page.getByText("Logout").click();
  52 | 
  53 |       await expect(await page.locator("article")).toHaveCount(0);
  54 |       await expect(page.getByText("Sign in to your account")).toBeVisible();
  55 |     },
  56 |   );
  57 | 
  58 |   test(
  59 |     "Shows home screen to authorised user",
  60 |     {
  61 |       tag: "@a2",
  62 |     },
  63 |     async ({ userPage }) => {
  64 |       await userPage.goto("/");
  65 | 
  66 |       // shows title
  67 |       await expect(
  68 |         userPage.getByText("Admin of Full Stack Blog", { exact: true }),
  69 |       ).toBeVisible();
  70 | 
  71 |       // LIST SCREEN > Article list is only accessible to logged-in users.
  72 |       await expect(await userPage.locator("article").count()).toBe(3);
  73 |     },
  74 |   );
  75 | });
  76 | 
```