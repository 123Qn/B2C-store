import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { BlogListItem } from "./ListItem";

const post1 = {
  id: 1,
  urlId: "hello-world",
  title: "Hello, World",
  content: "Test content",
  description: "Test description",
  imageUrl: "",
  date: new Date("2024-10-01"),
  category: "Cat",
  views: 200,
  likes: 30,
  tags: "Hello, World",
  active: true,
};

test("render blog post data", async () => {
  const { getByText } = render(<BlogListItem post={post1} />);

  await expect.element(getByText("Hello, World")).toBeVisible();
  await expect
    .element(getByText("Hello, World"))
    .toHaveAttribute("href", "/post/hello-world");
  await expect.element(getByText("Cat")).toBeVisible();
  await expect.element(getByText("#Hello")).toBeVisible();
  await expect.element(getByText("#World")).toBeVisible();
  await expect.element(getByText("01 Oct 2024")).toBeVisible();
  await expect.element(getByText("200 views")).toBeVisible();
  await expect.element(getByText("30 likes")).toBeVisible();
});