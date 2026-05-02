"use client";

import { useState, useRef } from "react";
import { marked } from "marked";

type Errors = {
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  tags?: string;
};

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdUrlId, setCreatedUrlId] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<number>(0);

  function validate(): Errors {
    const e: Errors = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    else if (description.length > 200) e.description = "Description is too long. Maximum is 200 characters";
    if (!content.trim()) e.content = "Content is required";
    if (!imageUrl.trim()) e.imageUrl = "Image URL is required";
    else { try { new URL(imageUrl); } catch { e.imageUrl = "This is not a valid URL"; } }
    if (!tags.trim()) e.tags = "At least one tag is required";
    return e;
  }

async function handleSave() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const res = await fetch("/api/posts", {  // ← fix: back to /api/posts
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, content, imageUrl, tags, category }),
    });

    if (res.ok) {
      const data = await res.json();
      setCreatedUrlId(data.urlId);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = `/post/${data.urlId}`;  // ← navigates after showing message
      }, 1000); // wait 1 second so user sees "Post updated successfully"
    }
  }

  async function handlePreview() {
    if (!showPreview) {
      cursorRef.current = contentRef.current?.selectionStart ?? 0;
      const html = await marked.parse(content);
      setPreview(html);
      setShowPreview(true);
    } else {
      setShowPreview(false);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.focus();
          contentRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
        }
      }, 0);
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <main>
      <h1>Create Post</h1>
      {success && <p>Post updated successfully</p>}
      {hasErrors && <p>Please fix the errors before saving</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={e => setTitle(e.target.value)} />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" value={category} onChange={e => setCategory(e.target.value)} />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <button onClick={handlePreview}>{showPreview ? "Close Preview" : "Preview"}</button>
        {showPreview ? (
          <div data-testid="content-preview" dangerouslySetInnerHTML={{ __html: preview }} />
        ) : (
          <textarea id="content" ref={contentRef} value={content} onChange={e => setContent(e.target.value)} />
        )}
        {errors.content && <p>{errors.content}</p>}
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
        {imageUrl && <img data-testid="image-preview" src={imageUrl} alt="preview" />}
      </div>

      <div>
        <label htmlFor="tags">Tags</label>
        <input id="tags" value={tags} onChange={e => setTags(e.target.value)} />
        {errors.tags && <p>{errors.tags}</p>}
      </div>

      <button onClick={handleSave}>Save</button>
    </main>
  );
}