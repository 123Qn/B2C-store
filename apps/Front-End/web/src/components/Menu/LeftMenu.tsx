import { CategoryList } from "./CategoryList";
import { BrandList } from "./BrandList";
import { MobileMenu } from "./Mobile";
import { leftMenuStyles as s } from "@/styles/leftMenu";

export async function LeftMenu() {
  return (
    <>
      {/* MOBILE */}
      <MobileMenu>
        <div className={s.menuSection}>
          <div>
            <h1 className={s.menuTitleSm}>Categories</h1>
            <CategoryList />
          </div>
          <div>
            <h1 className={s.menuTitleSm}>Brands</h1>
            <BrandList />
          </div>
        </div>
      </MobileMenu>

      {/* DESKTOP */}
      <aside className={s.desktop}>
        <div className={s.menuInner}>
          <div>
            <h1 className={s.menuTitle}>Categories</h1>
            <CategoryList />
          </div>
          <div>
            <h1 className={s.menuTitle}>Brands</h1>
            <BrandList />
          </div>
        </div>
      </aside>
    </>
  );
}