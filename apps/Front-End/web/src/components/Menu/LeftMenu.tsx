import { client } from "@repo/db/client";
import { MenuLinks } from "./MenuLinks";
import { MobileMenu } from "./Mobile";
import { leftMenuStyles as s } from "@/styles/leftMenu";

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export async function LeftMenu() {
  // ONE QUERY FOR BOTH LISTS
  const products = await client.db.product.findMany({
    where: { active: true },
    select: { category: true, brand: true },
  });

  const categories = uniqueSorted(products.map((p) => p.category)).map((category) => ({
    label: category,
    href: `/category/${encodeURIComponent(category.toLowerCase())}`,
  }));

  const brands = uniqueSorted(products.map((p) => p.brand)).map((brand) => ({
    label: brand,
    href: `/brand/${encodeURIComponent(brand.toLowerCase())}`,
  }));

  const sections = (
    <div className={s.menuSection}>
      <div>
        <h2 className={s.menuTitle}>Categories</h2>
        <MenuLinks links={categories} />
      </div>
      <div>
        <h2 className={s.menuTitle}>Brands</h2>
        <MenuLinks links={brands} />
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <MobileMenu>{sections}</MobileMenu>

      {/* DESKTOP */}
      <aside className={s.desktop}>
        <div className={s.menuInner}>{sections}</div>
      </aside>
    </>
  );
}
