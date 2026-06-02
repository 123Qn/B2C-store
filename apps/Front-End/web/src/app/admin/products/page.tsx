import Link from "next/link";
import { AdminProductList } from "@/components/Admin/ProductList";
import { client } from "@repo/db/client";

export default async function AdminProductsPage() {
  const products = await client.db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition">← Back to Dashboard</Link>
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-gray-500 mt-1">Manage your store products</p>
        </div>
        <Link href="/admin/products/new" className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition">
          + Add Product
        </Link>
      </div>
      <AdminProductList products={products} />
    </div>
  );
}