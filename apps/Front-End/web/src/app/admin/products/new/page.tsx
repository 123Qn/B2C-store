"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", brand: "", category: "", gender: "Unisex",
    description: "", price: "", stock: "", size: "", imageUrl: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // AUTO GENERATE urlId FROM NAME
      const urlId = form.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          urlId,
          price: Number(form.price),
          stock: Number(form.stock),
          size: form.size.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) { alert("Failed to create product"); return; }
      alert("Product created!");
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700 transition">← Back to Products</Link>
        <h1 className="text-4xl font-bold mt-2">Add Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 max-w-3xl flex flex-col gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Air Max 90"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} required placeholder="e.g. Nike"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <input name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Sneakers"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black">
            <option value="Unisex">Unisex</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Teen">Teen</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
            placeholder="Product description..."
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Price ($)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="e.g. 199"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="e.g. 50"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sizes (comma separated)</label>
          <input name="size" value={form.size} onChange={handleChange} required placeholder="e.g. S, M, L, XL"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required placeholder="https://..."
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="preview" className="mt-3 w-40 h-40 object-cover rounded-xl border" />
          )}
        </div>
        <button type="submit" className="bg-black text-white w-full py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition">
          Create Product
        </button>
      </form>
    </div>
  );
}