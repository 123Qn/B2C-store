"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { Product } from "@prisma/client";
import {
  ArchiveBoxIcon,
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import logo from "../../../public/wsulogo.png";
import { useCart } from "../Cart/CartContext";
import { SearchPopup } from "../Search/SearchPopup";
import { topMenuStyles as s } from "@/styles/topMenu";

const MAX_SEARCH_RESULTS = 6;

export function TopMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { totalItems: cartCount } = useCart();

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("auth_token");
      if (!token) { setLoggedIn(false); return; }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  // CLOSE SEARCH ON NAVIGATION
  useEffect(() => {
    setSearch("");
    setSearchOpen(false);
  }, [pathname]);

  // CLOSE SEARCH ON OUTSIDE CLICK
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    localStorage.removeItem("auth_token");
    setLoggedIn(false);
    router.push("/SessionManagement/login");
  }

  function goToProtected(path: string) {
    const token = localStorage.getItem("auth_token");
    if (!token) { router.push("/SessionManagement/login"); return; }
    router.push(path);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const query = search.trim().toLowerCase();
  const filteredProducts = useMemo(
    () =>
      query
        ? products.filter((p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query)
          )
        : [],
    [products, query]
  );

  return (
    <header className={s.navbar}>
      <div className={s.navRow}>

        {/* LOGO */}
        <Link href="/" className={s.logoLink}>
          <Image className={s.logoImg} src={logo} alt="logo" width={40} height={40} priority />
          <span className={s.logoText}>Q Fashion</span>
        </Link>

        {/* SEARCH */}
        <div ref={searchRef} className={s.searchWrapper}>
          <form role="search" onSubmit={handleSearchSubmit}>
            <MagnifyingGlassIcon className={s.searchIcon} aria-hidden />
            <input
              type="text"
              placeholder="Search your items..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
              className={s.searchInput}
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(""); setSearchOpen(false); }}
                className={s.searchClear}
                aria-label="Clear search"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </form>
          {searchOpen && query && (
            <SearchPopup
              query={search.trim()}
              products={filteredProducts.slice(0, MAX_SEARCH_RESULTS)}
              total={filteredProducts.length}
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <nav className={s.navRight}>
          <button
            onClick={() => goToProtected("/PaymentSystem/history")}
            title="Order History"
            aria-label="Order history"
            className={s.navBtn}
          >
            <ArchiveBoxIcon className={s.navIcon} />
          </button>

          <button
            onClick={() => goToProtected("/PaymentSystem/cart")}
            title="Cart"
            aria-label="Cart"
            className={s.navBtn}
          >
            <ShoppingBagIcon className={s.navIcon} />
            {cartCount > 0 && (
              <span className={s.cartBadge}>{cartCount > 99 ? "99+" : cartCount}</span>
            )}
          </button>

          {loggedIn ? (
            <button onClick={handleLogout} className={s.logoutBtn} aria-label="Log out">
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link href="/SessionManagement/login" className={s.loginBtn}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
