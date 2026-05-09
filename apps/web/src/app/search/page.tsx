import { AppLayout } from "@/components/Layout/AppLayout";

import ProductList from "@/components/Product/List";

import { products } from "@repo/db/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  const { q = "" } = await searchParams;

  const filteredProducts = products.filter((product) => {

    return (
      product.name
        .toLowerCase()
        .includes(q.toLowerCase())

      ||

      product.category
        .toLowerCase()
        .includes(q.toLowerCase())

      ||

      product.brand
        .toLowerCase()
        .includes(q.toLowerCase())
    );
  });

  return (
    <AppLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-8">

          Search:
          {" "}
          {q}

        </h1>

        <ProductList
          products={filteredProducts}
        />

      </div>

    </AppLayout>
  );
}