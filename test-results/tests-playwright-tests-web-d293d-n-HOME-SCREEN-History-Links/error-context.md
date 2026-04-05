# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\home-screen.spec.ts >> HOME SCREEN >> History Links
- Location: tests\playwright\tests\web\home-screen.spec.ts:55:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1   | import { seed } from "@repo/db/seed";
  2   | import { expect, test, type Page } from "./fixtures";
  3   | 
  4   | test.beforeAll(async () => {
  5   |   await seed();
  6   | });
  7   | 
  8   | test.describe("HOME SCREEN", () => {
  9   |   async function checkItem(
  10  |     page: Page,
  11  |     name: string,
  12  |     link: string,
  13  |     count?: number,
  14  |   ) {
  15  |     const linkItem = page.getByTitle(name);
  16  |     await expect(linkItem).toBeVisible();
  17  |     await expect(linkItem).toHaveAttribute("href", link);
  18  | 
  19  |     if (count) {
  20  |       const item = linkItem.getByTestId("post-count");
  21  |       await expect(item).toBeVisible();
  22  |       await expect(item).toContainText(count.toString());
  23  |     }
  24  |   }
  25  | 
  26  |   test(
  27  |     "Show Active Posts",
  28  |     {
  29  |       tag: "@a1",
  30  |     },
  31  |     async ({ page }) => {
  32  |       await page.goto("/");
  33  | 
  34  |       await expect(await page.locator("article").count()).toBe(3);
  35  |     },
  36  |   );
  37  | 
  38  |   test(
  39  |     "Category Links",
  40  |     {
  41  |       tag: "@a1",
  42  |     },
  43  |     async ({ page }) => {
  44  |       await page.goto("/");
  45  | 
  46  |       // HOME SCREEN > User must see the list of blog post categories, where each category points to UI showing only posts of that category
  47  | 
  48  |       await checkItem(page, "Category / React", "/category/react");
  49  |       await checkItem(page, "Category / Node", "/category/node");
  50  |       //await checkItem(page, "Category / Mongo", "/category/mongo");
  51  |       //await checkItem(page, "Category / DevOps", "/category/devops");
  52  |     },
  53  |   );
  54  | 
  55  |   test(
  56  |     "History Links",
  57  |     {
  58  |       tag: "@a1",
  59  |     },
  60  |     async ({ page }) => {
> 61  |       await page.goto("/");
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  62  | 
  63  |       // HOME SCREEN > User must see the history of blog posts, showing month and year, where each moth, year tuple points to UI showing only posts of that category
  64  | 
  65  |       await checkItem(page, "History / December, 2024", "/history/2024/12", 1);
  66  |       await checkItem(page, "History / April, 2022", "/history/2022/4", 1);
  67  |       await checkItem(page, "History / March, 2020", "/history/2020/3", 1);
  68  | 
  69  |       // HOME SCREEN > Tags and history items shown are only considered from active posts
  70  | 
  71  |       await expect(page.getByText("December, 2012")).not.toBeVisible();
  72  |     },
  73  |   );
  74  | 
  75  |   test(
  76  |     "Tag Links",
  77  |     {
  78  |       tag: "@a1",
  79  |     },
  80  |     async ({ page }) => {
  81  |       await page.goto("/");
  82  | 
  83  |       // HOME SCREEN > User must see the list of blog post tags, where each tag points to UI showing only posts of that category
  84  | 
  85  |       await checkItem(page, "Tag / Back-End", "/tags/back-end", 1);
  86  |       await checkItem(page, "Tag / Front-End", "/tags/front-end", 2);
  87  |       await checkItem(page, "Tag / Optimisation", "/tags/optimisation", 1);
  88  |       await checkItem(page, "Tag / Dev Tools", "/tags/dev-tools", 1);
  89  | 
  90  |       // HOME SCREEN > Tags and history items shown are only considered from active posts
  91  | 
  92  |       await expect(page.getByText("Mainframes")).not.toBeVisible();
  93  |     },
  94  |   );
  95  | 
  96  |   test(
  97  |     "Post Item",
  98  |     {
  99  |       tag: "@a1",
  100 |     },
  101 |     async ({ page }) => {
  102 |       await page.goto("/");
  103 | 
  104 |       const item = await page.getByTestId("blog-post-1");
  105 |       await expect(item).toBeVisible();
  106 | 
  107 |       // HOME SCREEN > The list shows the following items:
  108 |       // - short description
  109 |       // - date
  110 |       // - image
  111 |       // - tags
  112 |       // - likes
  113 |       // - views
  114 | 
  115 |       await expect(item.getByText("Boost your conversion rate")).toBeVisible();
  116 |       await expect(
  117 |         item.getByText("Boost your conversion rate"),
  118 |       ).toHaveAttribute("href", "/post/boost-your-conversion-rate");
  119 | 
  120 |       await expect(item.getByText("Node")).toBeVisible();
  121 |       await expect(item.getByText("#Back-End")).toBeVisible();
  122 |       await expect(item.getByText("#Databases")).toBeVisible();
  123 |       await expect(item.getByText("18 Apr 2022")).toBeVisible();
  124 |       await expect(item.getByText("321 views")).toBeVisible();
  125 |       await expect(item.getByText("3 likes")).toBeVisible();
  126 |     },
  127 |   );
  128 | 
  129 |   test(
  130 |     "Dark Mode Switch",
  131 |     {
  132 |       tag: "@a1",
  133 |     },
  134 |     async ({ page }) => {
  135 |       await page.goto("/");
  136 | 
  137 |       // HOME SCREEN > User must be able to switch between dark and light theme with a button
  138 | 
  139 |       const html = await page.getAttribute("html", "data-theme");
  140 |       if (html === "dark") {
  141 |         await page.getByText("Light Mode").click();
  142 |         // await page.waitForTimeout(1000);
  143 |         await expect(await page.getAttribute("html", "data-theme")).toBe(
  144 |           "light",
  145 |         );
  146 |       } else {
  147 |         await page.getByText("Dark Mode").click();
  148 |         // await page.waitForTimeout(1000);
  149 |         await expect(await page.getAttribute("html", "data-theme")).toBe(
  150 |           "dark",
  151 |         );
  152 |       }
  153 |     },
  154 |   );
  155 | 
  156 |   test(
  157 |     "Search Box",
  158 |     {
  159 |       tag: "@a1",
  160 |     },
  161 |     async ({ page }) => {
```