"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";

import logo from "../../../public/wsulogo.png";
import heroImage from "../../asset/image/hero.webp";
import { useCart } from "../Cart/CartContext";
import { SearchPopup } from "../Search/SearchPopup";
import { topMenuStyles as s } from "@/styles/topMenu";

export function TopMenu() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { cart } = useCart();

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("auth_token");
      if (!token) { setLoggedIn(false); return; }
      const res = await fetch("/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedIn(res.ok);
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
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

  const filteredProducts = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      {/* NAVBAR */}
      <div className={s.navbar}>
        <div className={s.navRow}>

          {/* LOGO */}
          <Link href="/" className={s.logoLink}>
            <Image className={s.logoImg} src={logo} alt="logo" width={50} height={50} priority />
            <span className={s.logoText}>Q Fashion</span>
          </Link>

          {/* RIGHT SIDE */}
          <div className={s.navRight}>
            {loggedIn ? (
              <button onClick={handleLogout} className={s.logoutBtn}>Logout</button>
            ) : (
              <Link href="/SessionManagement/login" className={s.loginBtn}>Login</Link>
            )}

            <button onClick={() => goToProtected("/PaymentSystem/history")} title="Order History" className={s.navBtn}>
              📦
            </button>

            <button onClick={() => goToProtected("/PaymentSystem/cart")} title="Cart" className={s.cartBtn}>
              🧺
              {cart.length > 0 && (
                <span className={s.cartBadge}>{cart.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className={s.searchWrapper}>
          <input
            type="text"
            placeholder="Search your items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={s.searchInput}
          />
          <span className={s.searchIcon}>🧵</span>
          {search && <SearchPopup products={filteredProducts} />}
        </div>
      </div>

      {/* HERO */}
      <section className={s.hero}>
        <Image src={heroImage} alt="Hero" fill priority className={s.heroImg} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>Timeless Fashion</h1>
          <p className={s.heroSubtitle}>Modern • Elegant • Everyday</p>
          <p className={s.heroText}>Click • Pay • Delivered</p>
          <p className={s.heroText}>Returns accepted within 30 days</p>
        </div>
      </section>
    </>
  );
}