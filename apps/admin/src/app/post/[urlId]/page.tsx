"use client";

import { posts as allPosts } from "@repo/db/data";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ModifyPage() {
  const { urlId } = useParams() as { urlId?: string };
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [showErrors, setShowErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPos = useRef(0);

  useEffect(() => {
    setLoggedIn(document.cookie.includes("auth_token="));
    setMounted(true);
  }, []);

  useEffect(() => {
    const post = allPosts.find((p) => p.urlId === urlId);
    if (post) setForm(post);
  }, [urlId]);

  function validate() {
    return {
      ...( !form.title && { title: "Title is required" }),
      ...( !form.description && { description: "Description is required" }),
      ...( form.description && form.description.length > 200 && {
        description: "Description is too long. Maximum is 200 characters",
      }),
      ...( !form.content && { content: "Content is required" }),
      ...( !form.imageUrl && { imageUrl: "Image URL is required" }),
      ...( form.imageUrl && !form.imageUrl.startsWith("http") && {
        imageUrl: "This is not a valid URL",
      }),
      ...( !form.tags && { tags: "At least one tag is required" }),
    };
  }
  function handleSave() {
    const e = validate();
    setErrors(e);
    setShowErrors(true);
    setSuccess(Object.keys(e).length === 0);
  }
  function handlePreview() {
    if (!preview && contentRef.current) {
      cursorPos.current = contentRef.current.selectionStart;
    }
    setPreview(!preview);
  }
  useEffect(() => {
    if (!preview && contentRef.current) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(cursorPos.current, cursorPos.current);
    }
  }, [preview]);

  if (!mounted) return null;

//require login when not
  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">Login</h1>
          <p className="text-gray-600">Sign in to your account</p>
          <Link href="/">Home</Link>
        </div>
      </main>
    );
  }
  //Main Modify form
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Modify Post
        </h1>
        {showErrors && Object.keys(errors).length > 0 && (
          <p className="mb-4 text-red-500">
            Please fix the errors before saving
          </p>
        )}
        {success && (
          <p className="mb-4 text-green-600">
            Post updated successfully
          </p>
        )}
        {form.imageUrl && (
          <img
            data-testid="image-preview"
            src={form.imageUrl}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
       
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <input
          id="description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}

        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>

        {preview ? (
          <div
            data-testid="content-preview"
            className="border p-3 rounded mb-2 bg-gray-50"
          >
            <ReactMarkdown>{form.content || ""}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content"
            ref={contentRef}
            value={form.content || ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mb-2 min-h-[120px]"
          />
        )}

        {errors.content && <p className="text-red-500">{errors.content}</p>}

        <button
          onClick={handlePreview}
          className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          {preview ? "Close Preview" : "Preview"}
        </button>

        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          id="imageUrl"
          value={form.imageUrl || ""}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl}</p>
        )}

        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags
        </label>
        <input
          id="tags"
          value={form.tags || ""}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.tags && <p className="text-red-500">{errors.tags}</p>}

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </main>
  );
}