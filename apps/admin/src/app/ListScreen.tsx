"use client";

import { useState } from "react";
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

export default function ListScreen({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filterContent, setFilterContent] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/";
  }

  async function handleToggleActive(post: Post) {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !post.active }),
    });
    if (res.ok) {
      setPosts(prev => prev.map(p =>
        p.id === post.id ? { ...p, active: !p.active } : p
      ));
    }
  }

  function getFiltered() {
    let result = [...posts];

    if (filterContent) {
      const lower = filterContent.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.content.toLowerCase().includes(lower)
      );
    }

    if (filterTag) {
      const lower = filterTag.toLowerCase();
      result = result.filter(p => p.tags.toLowerCase().includes(lower));
    }

    if (filterDate) {
      const parsed = new Date(filterDate);
      if (!isNaN(parsed.getTime())) {
        result = result.filter(p => new Date(p.date) >= parsed);
      }
    }

    result.sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    return result;
  }

  const filtered = getFiltered();

  return (
    <>
      <main className="list-main">
        <header className="list-header">
          <h1>Admin of Full Stack Blog</h1>
          <div className="header-actions">
            <Link href="/posts/create" className="btn-create">+ Create Post</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </header>

        <div className="list-filters">
          <div className="filter-group">
            <label htmlFor="filter-content">Filter by Content:</label>
            <input id="filter-content" type="text" value={filterContent} onChange={e => setFilterContent(e.target.value)} placeholder="Search title or content..." />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-tag">Filter by Tag:</label>
            <input id="filter-tag" type="text" value={filterTag} onChange={e => setFilterTag(e.target.value)} placeholder="e.g. React" />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-date">Filter by Date Created:</label>
            <input id="filter-date" type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort By:</label>
            <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="title-asc">A-Z</option>
              <option value="title-desc">Z-A</option>
            </select>
          </div>
        </div>

        <div className="list-count">
          Showing <span>{filtered.length}</span> of <span>{posts.length}</span> posts
        </div>

        <div className="list-grid">
          {filtered.length === 0 && (
            <div className="list-empty">No posts match your filters.</div>
          )}
          {filtered.map(post => (
            <article key={post.id}>
              <img className="article-img" src={post.imageUrl} alt={post.title} />

              <div className="article-body">
                <Link href={`/post/${post.urlId}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div className="article-meta">
                  <span className="article-category">{post.category}</span>
                  <span className="article-tags">{post.tags.split(",").map(t => `#${t.trim()}`).join(", ")}</span>
                  <span className="article-date">Posted on {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>

              <div className="article-actions">
                <button
                  data-testid={`toggle-active-${post.id}`}
                  className={`btn-toggle ${post.active ? "active" : "inactive"}`}
                  onClick={() => handleToggleActive(post)}
                >
                  {post.active ? "Active" : "Inactive"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}