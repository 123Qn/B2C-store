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

export default function CreatePostPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState<PostForm>({
    title: "", description: "", content: "", imageUrl: "", tags: "", category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [preview, setPreview] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [success, setSuccess] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const hasAuth = cookies.some((c) => c.startsWith("auth_token="));
    setLoggedIn(hasAuth);
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
  const generatedUrlId = form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <main>
      <h1>Create Post</h1>

      {success && (
        <>
          <p>Post updated successfully</p>
          <a href={`/post/${generatedUrlId}`}>{form.title}</a>
        </>
      )}
      {showErrors && hasErrors && <p>Please fix the errors before saving</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={form.category} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" value={form.description} onChange={handleChange} />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        {preview ? (
          <div data-testid="content-preview">
            <ReactMarkdown>{form.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea id="content" name="content" ref={contentRef} value={form.content} onChange={handleChange} />
        )}
        {errors.content && <p>{errors.content}</p>}
        <button type="button" onClick={handlePreview}>
          {preview ? "Close Preview" : "Preview"}
        </button>
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
        {form.imageUrl && (
          <img data-testid="image-preview" src={form.imageUrl} alt="preview" />
        )}
      </div>

      <div>
        <label htmlFor="tags">Tags</label>
        <input id="tags" name="tags" value={form.tags} onChange={handleChange} />
        {errors.tags && <p>{errors.tags}</p>}
      </div>

      <button type="button" onClick={handleSave}>Save</button>
    </main>
  );
}