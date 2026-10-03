"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { formatPrice, getSizes } from "@/lib/format";
import { authHeaders } from "@/lib/auth";
import { AdminGuard } from "@/components/Admin/AdminGuard";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-4 focus:ring-stone-200/60";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";

// "Air Max 90!" -> "air-max-90"
function toUrlId(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", brand: "", category: "", gender: "Unisex",
    description: "", price: "", stock: "", size: "", imageUrl: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const sizes = getSizes(form.size);
  const urlId = toUrlId(form.name);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (e.target.name === "imageUrl") setImageFailed(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!urlId) { setError("Product name must contain letters or numbers."); return; }
    if (sizes.length === 0) { setError("Please enter at least one size."); return; }

    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          brand: form.brand.trim(),
          category: form.category.trim(),
          urlId,
          price: Number(form.price),
          stock: Number(form.stock),
          size: sizes,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          res.status === 401 || res.status === 403
            ? "Your admin session has expired. Please log in again."
            : res.status === 409
            ? "A product with this name already exists. Please use a different name."
            : data.message || "Failed to create product"
        );
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Products
        </Link>
        <h1 className="mb-8 mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Add Product</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200" role="alert">{error}</p>}

            <div>
              <label htmlFor="name" className={labelClass}>Product Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Air Max 90" className={inputClass} />
              {urlId && <p className="mt-1.5 text-xs text-stone-400">URL: /products/{urlId}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="brand" className={labelClass}>Brand</label>
                <input id="brand" name="brand" value={form.brand} onChange={handleChange} required placeholder="e.g. Nike" className={inputClass} />
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <input id="category" name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Sneakers" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className={labelClass}>Gender</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                <option value="Unisex">Unisex</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Teen">Teen</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={4}
                placeholder="Product description..." className={`${inputClass} resize-none`} />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className={labelClass}>Price ($)</label>
                <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="e.g. 199" className={inputClass} />
              </div>
              <div>
                <label htmlFor="stock" className={labelClass}>Stock</label>
                <input id="stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required placeholder="e.g. 50" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="size" className={labelClass}>Sizes (comma separated)</label>
              <input id="size" name="size" value={form.size} onChange={handleChange} required placeholder="e.g. S, M, L, XL" className={inputClass} />
            </div>

            <div>
              <label htmlFor="imageUrl" className={labelClass}>Image URL</label>
              <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} required placeholder="https://..." className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-ink py-4 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "Creating…" : "Create Product"}
            </button>
          </form>

          {/* LIVE PREVIEW */}
          <aside className="h-fit lg:sticky lg:top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">Preview</p>
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
              <div className="flex aspect-[4/5] items-center justify-center bg-stone-100">
                {form.imageUrl && !imageFailed ? (
                  <img src={form.imageUrl} alt="preview" onError={() => setImageFailed(true)} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-stone-400">
                    <PhotoIcon className="h-10 w-10" />
                    <span className="text-xs">{imageFailed ? "Image could not be loaded" : "Image preview"}</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400">{form.category || "Category"}</p>
                <p className="mt-1 font-medium">{form.name || "Product name"}</p>
                <p className="text-sm text-stone-500">{form.brand || "Brand"} · {form.gender}</p>
                {sizes.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {sizes.map((size) => (
                      <span key={size} className="rounded-md border border-stone-200 px-2 py-0.5 text-xs text-stone-500">{size}</span>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-lg font-semibold">{formatPrice(Number(form.price) || 0)}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}
