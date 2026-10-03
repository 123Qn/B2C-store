import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AdminProductList } from "@/components/Admin/ProductList";
import { store } from "@repo/db/store";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await store.products.list();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink">
          <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="mb-8 mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Products</h1>
            <p className="mt-1 text-stone-500">Manage your store products</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            <PlusIcon className="h-4 w-4" /> Add Product
          </Link>
        </div>
        <AdminProductList products={products} />
      </div>
    </div>
  );
}
