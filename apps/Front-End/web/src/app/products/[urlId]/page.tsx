import { ProductDetail } from "@/components/Product/Detail";
import { AppLayout } from "@/components/Layout/AppLayout";

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

  if (!product) {
    return (
      <div>
        Not Found
      </div>
    );
  }

  return (
    <AppLayout>
      <ProductDetail product={product} />
    </AppLayout>
  );
}