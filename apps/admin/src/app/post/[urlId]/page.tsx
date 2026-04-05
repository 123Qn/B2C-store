"use client";

import { posts as allPosts } from "@repo/db/data";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

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

function isLoggedIn() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("auth_token="));
}

function validate(form: Partial<Post>) {
  const errors: Record<string, string> = {};
  if (!form.title?.trim()) errors.title = "Title is required";
  if (!form.description?.trim()) errors.description = "Description is required";
  else if (form.description.length > 200)
    errors.description = "Description is too long. Maximum is 200 characters";
  if (!form.content?.trim()) errors.content = "Content is required";
  if (!form.imageUrl?.trim()) errors.imageUrl = "Image URL is required";
  else {
    try { new URL(form.imageUrl); } catch { errors.imageUrl = "This is not a valid URL"; }
  }
  if (!form.tags?.trim()) errors.tags = "At least one tag is required";
  return errors;
}

export default function PostPage() {
  const params = useParams();
  const urlId = params?.urlId as string;

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [form, setForm] = useState<Partial<Post>>({
    title: "", description: "", content: "", imageUrl: "", tags: "", category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [preview, setPreview] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [success, setSuccess] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const post = allPosts.find((p) => p.urlId === urlId);
    if (post) {
      setForm({
        title: post.title,
        description: post.description,
        content: post.content,
        imageUrl: post.imageUrl,
        tags: post.tags,
        category: post.category,
      });
    }
  }, [urlId]);

  useEffect(() => {
    if (!preview && contentRef.current) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [preview]);

  if (!loggedIn) {
    return (
      <main>
        <h1>Login</h1>
        <p>Sign in to your account</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const pw = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
          if (pw === "123") { document.cookie = "auth_token=valid; path=/"; setLoggedIn(true); }
        }}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Sign In</button>
        </form>
      </main>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (showErrors) {
      setErrors(validate({ ...form, [name]: value }));
    }
  }

  function handleSave() {
    const newErrors = validate(form);
    setErrors(newErrors);
    setShowErrors(true);
    if (Object.keys(newErrors).length > 0) return;
    setSuccess(true);
  }

  function handlePreview() {
    if (!preview && contentRef.current) {
      setCursorPos(contentRef.current.selectionStart ?? 0);
    }
    setPreview((p) => !p);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <main>
      <h1>Edit Post</h1>

      {success && <p>Post updated successfully</p>}
      {showErrors && hasErrors && <p>Please fix the errors before saving</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title ?? ""} onChange={handleChange} />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" value={form.description ?? ""} onChange={handleChange} />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        {preview ? (
          <div data-testid="content-preview">
            <ReactMarkdown>{form.content ?? ""}</ReactMarkdown>
          </div>
        ) : (
          <textarea id="content" name="content" ref={contentRef} value={form.content ?? ""} onChange={handleChange} />
        )}
        {errors.content && <p>{errors.content}</p>}
        <button type="button" onClick={handlePreview}>
          {preview ? "Close Preview" : "Preview"}
        </button>
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" name="imageUrl" value={form.imageUrl ?? ""} onChange={handleChange} />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
        {form.imageUrl && (
          <img data-testid="image-preview" src={form.imageUrl} alt="preview" />
        )}
      </div>

      <div>
        <label htmlFor="tags">Tags</label>
        <input id="tags" name="tags" value={form.tags ?? ""} onChange={handleChange} />
        {errors.tags && <p>{errors.tags}</p>}
      </div>

      <button type="button" onClick={handleSave}>Save</button>
    </main>
  );
}