import { store } from "@repo/db/store";
import { MenuLinks } from "./MenuLinks";
import { MobileMenu } from "./Mobile";
import { leftMenuStyles as s } from "@/styles/leftMenu";

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export async function LeftMenu() {
  // ONE LOOKUP FOR BOTH LISTS
  const products = await store.products.list({ activeOnly: true });

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
