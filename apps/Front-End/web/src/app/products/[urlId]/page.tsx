import Link from "next/link";
import { ProductDetail } from "@/components/Product/Detail";
import { AppLayout } from "@/components/Layout/AppLayout";
import { productStyles as s } from "@/styles/product";

import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  const product = await client.db.product.findUnique({
    where: {
      urlId,
    },
  });

  if (!product || !product.active) {
    return (
      <AppLayout>
        <div className={s.notFound}>
          <h1 className={s.notFoundTitle}>Product Not Found</h1>
          <p className={s.notFoundDesc}>This item may have been removed or is no longer available.</p>
          <Link href="/" className={s.notFoundBtn}>Back to shop</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ProductDetail product={product} />
    </AppLayout>
  );
}
