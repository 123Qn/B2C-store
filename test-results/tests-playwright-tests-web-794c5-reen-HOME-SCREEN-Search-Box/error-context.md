# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\tests\web\home-screen.spec.ts >> HOME SCREEN >> Search Box
- Location: tests\playwright\tests\web\home-screen.spec.ts:156:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
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
> 162 |       await page.goto("/");
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  163 | 
  164 |       // HOME SCREEN > There is a search functionality that filters blogs based on string found in title or description
  165 | 
  166 |       await page.getByPlaceholder("Search").fill("Fatboy");
  167 |       await expect(page).toHaveURL("/search?q=Fatboy");
  168 |     },
  169 |   );
  170 | });
```