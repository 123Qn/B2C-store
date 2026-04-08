"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type PostForm = {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string;
  category: string;
};
function validate(form: PostForm) {
  return {
    ...( !form.title?.trim() && { title: "Title is required" }),

    ...( !form.description?.trim() && { description: "Description is required" }),
    ...( form.description?.length > 200 && {
      description: "Description is too long. Maximum is 200 characters",
    }),
    ...( !form.content?.trim() && { content: "Content is required" }),
    ...( !form.imageUrl?.trim() && { imageUrl: "Image URL is required" }),
    ...( form.imageUrl && (() => {
      try { new URL(form.imageUrl); return false; }
      catch { return true; }
    })() && { imageUrl: "This is not a valid URL" }),
    ...( !form.tags?.trim() && { tags: "At least one tag is required" }),
  };
}

export default function CreatePostPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState<PostForm>({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    tags: "",
    category: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [preview, setPreview] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [success, setSuccess] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setLoggedIn(document.cookie.includes("auth_token="));
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!preview && contentRef.current) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [preview]);

  if (!checked) return null;


  if (!loggedIn) {
    return (
      <main>
        <h1>Login</h1>
        <p>Sign in to your account</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const pw = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
            if (pw === "123") {
              document.cookie = "auth_token=valid; path=/";
              setLoggedIn(true);
            }
          }}
        >
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Sign In</button>
        </form>
      </main>
    );
  }

 
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (showErrors) {
      setErrors(validate(updated));
    }
  }


  function handleSave() {
    const e = validate(form);
    setErrors(e);
    setShowErrors(true);
    setSuccess(Object.keys(e).length === 0);
  }


  function handlePreview() {
    if (!preview && contentRef.current) {
      setCursorPos(contentRef.current.selectionStart ?? 0);
    }
    setPreview(!preview);
  }

  const hasErrors = Object.keys(errors).length > 0;

  const generatedUrlId = form.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">Create Post</h1>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            <p>Post updated successfully</p>
            <a href={`/post/${generatedUrlId}`} className="underline font-medium">
              {form.title}
            </a>
          </div>
        )}

        {showErrors && hasErrors && (
          <p className="mb-4 text-red-500">
            Please fix the errors before saving
          </p>
        )}

        {/* TITLE */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        {/* CATEGORY */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        {/* CONTENT */}
        <div className="mb-4">
          <label htmlFor="content" className="block font-medium mb-1">
            Content
          </label>

          {preview ? (
            <div
              data-testid="content-preview"
              className="border rounded-lg p-3 bg-gray-50"
            >
              <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              id="content"
              name="content"
              ref={contentRef}
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
            />
          )}

          {errors.content && <p className="text-red-500">{errors.content}</p>}

          <button
            type="button"
            onClick={handlePreview}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {preview ? "Close Preview" : "Preview"}
          </button>
        </div>

        {/* IMAGE */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium mb-1">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl}</p>
          )}

          {form.imageUrl && (
            <img
              data-testid="image-preview"
              src={form.imageUrl}
              alt="preview"
              className="mt-3 w-40 h-40 object-cover border rounded"
            />
          )}
        </div>

        {/* TAGS */}
        <div className="mb-6">
          <label htmlFor="tags" className="block font-medium mb-1">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.tags && <p className="text-red-500">{errors.tags}</p>}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </main>
  );
}