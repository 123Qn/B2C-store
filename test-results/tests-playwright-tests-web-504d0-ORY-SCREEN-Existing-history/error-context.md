# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\history-screen.spec.ts >> HISTORY SCREEN >> Existing history
- Location: tests\playwright\tests\web\history-screen.spec.ts:4:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/history/2024/12", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "./fixtures";
  2  | 
  3  | test.describe("HISTORY SCREEN", () => {
  4  |   test(
  5  |     "Existing history",
  6  |     {
  7  |       tag: "@a1",
  8  |     },
  9  |     async ({ page }) => {
> 10 |       await page.goto("/history/2024/12");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  11 | 
  12 |       // HISTORY SCREEN > Displays posts from year and month specified in the url (e.g. /history/2024/12)
  13 | 
  14 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  15 |       await expect(articles).toHaveCount(1);
  16 | 
  17 |       await expect(page.getByTestId("blog-post-3")).toBeVisible();
  18 |       await expect(
  19 |         page.getByText("No front end framework is the best"),
  20 |       ).toBeVisible();
  21 |     },
  22 |   );
  23 | 
  24 |   test(
  25 |     "Invalid History",
  26 |     {
  27 |       tag: "@a1",
  28 |     },
  29 |     async ({ page }) => {
  30 |       await page.goto("/history/2024/1");
  31 | 
  32 |       // HISTORY SCREEN > Displays "0 Posts" when search does not find anything
  33 | 
  34 |       const articles = await page.locator('[data-test-id^="blog-post-"]');
  35 |       await expect(articles).toHaveCount(0);
  36 | 
  37 |       await expect(page.getByText("0 Posts")).toBeVisible();
  38 |     },
  39 |   );
  40 | });
  41 | 
```