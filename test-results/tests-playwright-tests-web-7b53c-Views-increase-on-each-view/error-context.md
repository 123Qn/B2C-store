# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\detail-screen.spec.ts >> DETAIL SCREEN >> Views increase on each view
- Location: tests\playwright\tests\web\detail-screen.spec.ts:41:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/post/boost-your-conversion-rate", waiting until "load"

```

# Test source

```ts
  1  | import { seed } from "@repo/db/seed";
  2  | import { expect, test } from "./fixtures";
  3  | 
  4  | test.describe("DETAIL SCREEN", () => {
  5  |   test.beforeEach(async () => {
  6  |     await seed();
  7  |   });
  8  | 
  9  |   test(
  10 |     "Detail view",
  11 |     {
  12 |       tag: "@a1",
  13 |     },
  14 |     async ({ page }) => {
  15 |       await page.goto("/post/boost-your-conversion-rate");
  16 | 
  17 |       // DETAIL SCREEN > Detail page shows the same items as list item, but the short description is replaced by formatted long description
  18 | 
  19 |       const item = await page.getByTestId("blog-post-1");
  20 |       await expect(item).toBeVisible();
  21 | 
  22 |       await expect(item.getByText("Boost your conversion rate")).toBeVisible();
  23 |       await expect(
  24 |         item.getByText("Boost your conversion rate"),
  25 |       ).toHaveAttribute("href", "/post/boost-your-conversion-rate");
  26 | 
  27 |       await expect(item.getByText("Node")).toBeVisible();
  28 |       await expect(item.getByText("#Back-End")).toBeVisible();
  29 |       await expect(item.getByText("#Databases")).toBeVisible();
  30 |       await expect(item.getByText("18 Apr 2022")).toBeVisible();
  31 |       await expect(item.getByText("321 views")).toBeVisible();
  32 |       await expect(item.getByText("3 likes")).toBeVisible();
  33 | 
  34 |       // DETAIL SCREEN > Detail text is stored as Markdown, which needs to be converted to HTML
  35 |       await expect(
  36 |         await page.getByTestId("content-markdown").innerHTML(),
  37 |       ).toContain("<strong>sint voluptas</strong>");
  38 |     },
  39 |   );
  40 | 
  41 |   test(
  42 |     "Views increase on each view",
  43 |     {
  44 |       tag: "@a3",
  45 |     },
  46 |     async ({ page }) => {
  47 |       // BACKEND / CLIENT > Each visit of the page increases the post "views" count by one
  48 | 
> 49 |       await page.goto("/post/boost-your-conversion-rate");
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  50 |       await expect(page.getByText("321 views")).toBeVisible();
  51 |       await page.goto("/post/boost-your-conversion-rate");
  52 |       await expect(page.getByText("322 views")).toBeVisible();
  53 |     },
  54 |   );
  55 | 
  56 |   test(
  57 |     "Like posts",
  58 |     {
  59 |       tag: "@a3",
  60 |     },
  61 |     async ({ page }) => {
  62 |       // BACKEND / CLIENT > User can "like" the post on the detail screen, NOT on the list
  63 | 
  64 |       await page.goto("/post/boost-your-conversion-rate");
  65 |       await expect(page.getByText("3 likes")).toBeVisible();
  66 |       await page.getByTestId("like-button").click();
  67 |       await expect(page.getByText("4 likes")).toBeVisible();
  68 | 
  69 |       await page.goto("/post/boost-your-conversion-rate");
  70 |       await expect(page.getByText("4 likes")).toBeVisible();
  71 |       await page.getByTestId("like-button").click();
  72 |       await expect(page.getByText("3 likes")).toBeVisible();
  73 |     },
  74 |   );
  75 | });
  76 | 
```