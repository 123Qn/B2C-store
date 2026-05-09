import { ProductDetail } from "@/components/Product/Detail";
import { AppLayout } from "@/components/Layout/AppLayout";
import { products } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {

  const { urlId } = await params;

  const product = products.find(
    (product) => product.urlId === urlId
  );

  if (!product) {
    return <div>Not Found</div>;
  }

  return (
    <AppLayout>
    <ProductDetail product={product} />
    </AppLayout>
  );
}