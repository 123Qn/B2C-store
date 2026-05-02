"use client";

import { useState, useRef, useEffect } from "react";
import { marked } from "marked";

type Post = {
  id: number;
  urlId: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string;
  category: string;
};

type Errors = {
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  tags?: string;
};

export default function UpdateForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [tags, setTags] = useState(post.tags);
  const [category, setCategory] = useState(post.category);
  const [errors, setErrors] = useState<Errors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState(false);
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

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, content, imageUrl, tags, category }),
    });

    if (res.ok) setSuccess(true);
  }

  async function handlePreview() {
    if (!showPreview) {
      cursorRef.current = contentRef.current?.selectionStart ?? 0;
      const html = await marked.parse(content);
      setPreview(html);
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }

  useEffect(() => {
    if (!showPreview && contentRef.current) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
    }
  }, [showPreview]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <main className="form-main">
      <header className="form-header">
        <div>
          <p className="form-eyebrow">Admin — Editing</p>
          <h1>Edit Post</h1>
        </div>
      </header>

      <div className="form-body">
        {success && <p className="form-alert success">Post updated successfully</p>}
        {hasErrors && <p className="form-alert error">Please fix the errors before saving</p>}

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={e => setTitle(e.target.value)} />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input id="category" value={category} onChange={e => setCategory(e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
          {errors.description && <p className="field-error">{errors.description}</p>}
        </div>

        <div className="form-field">
          <div className="content-toolbar">
            <label htmlFor="content">Content</label>
            <button className="btn-preview" onClick={handlePreview}>{showPreview ? "Close Preview" : "Preview"}</button>
          </div>
          {showPreview ? (
            <div data-testid="content-preview" className="content-preview" dangerouslySetInnerHTML={{ __html: preview }} />
          ) : (
            <textarea id="content" className="content-area" ref={contentRef} value={content} onChange={e => setContent(e.target.value)} />
          )}
          {errors.content && <p className="field-error">{errors.content}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="imageUrl">Image URL</label>
          <input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
          {errors.imageUrl && <p className="field-error">{errors.imageUrl}</p>}
          {imageUrl && (
            <div className="image-preview-box">
              <img data-testid="image-preview" src={imageUrl} alt="preview" />
            </div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          <input id="tags" value={tags} onChange={e => setTags(e.target.value)} />
          {errors.tags && <p className="field-error">{errors.tags}</p>}
        </div>

        <div className="form-footer">
          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </main>
  );
}