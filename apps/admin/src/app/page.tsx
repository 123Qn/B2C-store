"use client";

import { posts as allPosts } from "@repo/db/data";
import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  urlId: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  date: Date;
  category: string;
  views: number;
  likes: number;
  tags: string;
  active: boolean;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTags(tags: string) {
  return tags
    .split(",")
    .map((t) => `#${t.trim()}`)
    .join(", ");
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<Post[]>(allPosts.filter((p) => p.active));
  const [filterContent, setFilterContent] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

 useEffect(() => {
  const hasAuth = document.cookie
    .split(";")
    .some((c) => c.trim().startsWith("auth_token="));

  if (hasAuth) {
    // ✅ Playwright / real login → stay logged in
    setLoggedIn(true);
  } else {
    // ✅ No cookie → logout
    setLoggedIn(false);
  }

  setMounted(true);
}, []);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  if (password === "123") {
    document.cookie = "auth_token=valid; path=/"; // required for tests
    setLoggedIn(true);
  }
}

function handleLogout() {
  document.cookie = "auth_token=; path=/; max-age=0";
  setLoggedIn(false);
}

  // -------- LOGIN SCREEN --------
  // Always render login on server + first client render to avoid hydration mismatch
  if (!mounted || !loggedIn) {
    return (
      <main>
        <h1>Login</h1>
        <p>Sign in to your account</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Sign In</button>
        </form>
      </main>
    );
  }

  function getFiltered() {
    let result = [...posts];

    if (filterContent) {
      const lower = filterContent.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.content.toLowerCase().includes(lower)
      );
    }

    if (filterTag) {
      const lower = filterTag.toLowerCase();
      result = result.filter((p) => p.tags.toLowerCase().includes(lower));
    }

    if (filterDate) {
      const parsed = new Date(filterDate);
      if (!isNaN(parsed.getTime())) {
        result = result.filter((p) => new Date(p.date) >= parsed);
      }
    }

    result.sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "date-asc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "date-desc")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    return result;
  }

  const filtered = getFiltered();

  // -------- ADMIN SCREEN --------
  return (
    <main>
      <h1 data-testid="admin-title">Admin of Full Stack Blog</h1>

      <button onClick={handleLogout}>Logout</button>

      <Link href="/posts/create">Create Post</Link>

      <div>
        <label htmlFor="filter-content">Filter by Content:</label>
        <input
          id="filter-content"
          type="text"
          value={filterContent}
          onChange={(e) => setFilterContent(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filter-tag">Filter by Tag:</label>
        <input
          id="filter-tag"
          type="text"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filter-date">Filter by Date Created:</label>
        <input
          id="filter-date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sort-by">Sort By:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>

      {filtered.map((post) => (
        <article key={post.id}>
          <img src={post.imageUrl} alt={post.title} />
          <Link href={`/post/${post.urlId}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.category}</p>
          <p>{formatTags(post.tags)}</p>
          <p>Posted on {formatDate(post.date)}</p>
          <button
            onClick={() =>
              setPosts((prev) =>
                prev.map((p) =>
                  p.id === post.id ? { ...p, active: !p.active } : p
                )
              )
            }
          >
            {post.active ? "Active" : "Inactive"}
          </button>
        </article>
      ))}
    </main>
  );
}