"use client";

import type { Product } from "@prisma/client";
import { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FALLBACK_IMAGE, formatPrice } from "@/lib/format";
import { authHeaders } from "@/lib/auth";

export function AdminProductList({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((p) => p.active).length,
    lowStock: products.filter((p) => p.stock <= 5).length,
    sold: products.reduce((total, p) => total + p.sold, 0),
  }), [products]);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  async function toggleActive(id: number, current: boolean) {
    if (pendingId !== null) return;
    setPendingId(id);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ active: !current }),
      });

      if (res.status === 401 || res.status === 403) { setError("Your admin session has expired. Please log in again."); return; }
      if (!res.ok) { setError("Failed to update product status"); return; }

      // UPDATE LOCAL STATE
      setProducts((prev) =>
        prev.map((p) => p.id === id ? { ...p, active: !current } : p)
      );
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total items", value: stats.total },
          { label: "Live in store", value: stats.active },
          { label: "Low stock (≤5)", value: stats.lowStock },
          { label: "Units sold", value: stats.sold },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name, brand or category"
          className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-stone-400 focus:ring-4 focus:ring-stone-200/60"
        />
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="p-4 text-left font-medium">Product</th>
                <th className="p-4 text-left font-medium">Category</th>
                <th className="p-4 text-right font-medium">Price</th>
                <th className="p-4 text-right font-medium">Stock</th>
                <th className="p-4 text-right font-medium">Sold</th>
                <th className="p-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {visibleProducts.map((product) => (
                <tr key={product.id} className="transition hover:bg-stone-50/70">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl || FALLBACK_IMAGE} alt={product.name} className="h-12 w-12 rounded-xl bg-stone-100 object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{product.name}</p>
                        <p className="text-xs text-stone-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize text-stone-600">{product.category}</td>
                  <td className="p-4 text-right font-medium tabular-nums">{formatPrice(product.price)}</td>
                  <td className={`p-4 text-right tabular-nums ${product.stock <= 5 ? "font-medium text-amber-600" : ""}`}>
                    {product.stock}
                  </td>
                  <td className="p-4 text-right tabular-nums">{product.sold}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(product.id, product.active)}
                      disabled={pendingId === product.id}
                      title="Click to toggle visibility in the store"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 transition disabled:opacity-50 ${
                        product.active
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                          : "bg-stone-100 text-stone-600 ring-stone-200 hover:bg-stone-200"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${product.active ? "bg-emerald-500" : "bg-stone-400"}`} />
                      {product.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-stone-500">No matching products</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
