"use client";

import type { Product } from "@prisma/client";
import { useState } from "react";

export function AdminProductList({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts);

  async function toggleActive(id: number, current: boolean) {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !current }),
      });

      if (!res.ok) { alert("Failed to update"); return; }

      // UPDATE LOCAL STATE
      setProducts((prev) =>
        prev.map((p) => p.id === id ? { ...p, active: !current } : p)
      );
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Stock</th>
            <th className="text-left p-4">Sold</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500 text-xs">{product.brand}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-gray-600">{product.category}</td>
              <td className="p-4 font-semibold">${product.price}</td>
              <td className="p-4">{product.stock}</td>
              <td className="p-4">{product.sold}</td>
              <td className="p-4">
                <button
                  onClick={() => toggleActive(product.id, product.active)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    product.active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}