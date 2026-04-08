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
      setLoggedIn(true);
    } else {
      // No cookie → logout
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
  if (!mounted) {
    return null;
  }
  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

          <h1 className="text-2xl font-bold text-center mb-2">
            Login
          </h1>

          <p className="text-gray-600 text-center mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </button>

          </form>
        </div>
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
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1
            data-testid="admin-title"
            className="text-3xl font-bold text-gray-800"
          >
            Admin of Full Stack Blog
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/post/create"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Create Post
          </Link>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl shadow">

          <div>
            <label htmlFor="filter-content" className="block text-sm font-medium mb-1">
              Filter by Content:
            </label>
            <input
              id="filter-content"
              type="text"
              value={filterContent}
              onChange={(e) => setFilterContent(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="filter-tag" className="block text-sm font-medium mb-1">
              Filter by Tag:
            </label>
            <input
              id="filter-tag"
              type="text"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="filter-date" className="block text-sm font-medium mb-1">
              Filter by Date Created:
            </label>
            <input
              id="filter-date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium mb-1">
              Sort By:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="title-asc">A-Z</option>
              <option value="title-desc">Z-A</option>
            </select>
          </div>
        </div>

        {/* POSTS LIST */}
        <div className="grid gap-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow p-4 flex gap-4"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-40 h-40 object-cover rounded-lg"
              />

              <div className="flex flex-col justify-between flex-1">

                {/* TOP */}
                <div>
                  <Link href={`/post/${post.urlId}`}>
                    <h2 className="text-xl font-semibold hover:underline">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-500">
                    {post.category}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {formatTags(post.tags)}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Posted on {formatDate(post.date)}
                  </p>
                </div>

                {/* ACTION */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      setPosts((prev) =>
                        prev.map((p) =>
                          p.id === post.id
                            ? { ...p, active: !p.active }
                            : p
                        )
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs ${post.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {post.active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}