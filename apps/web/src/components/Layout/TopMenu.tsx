"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import type { Product } from "@prisma/client";

import logo from "../../../public/wsulogo.png";
import heroImage from "../../asset/image/hero.webp";

import { useCart } from "../Cart/CartContext";
import { SearchPopup } from "../Search/SearchPopup";
import { handleLogout } from "@/app/utils/page";

export function TopMenu() {
  const [search, setSearch] =
    useState("");

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [products, setProducts] =
    useState<Product[]>([]);

  const { cart } = useCart();

  // LOGIN CHECK
  useEffect(() => {
    async function checkLogin() {
      const res = await fetch(
        "/api/auth/check"
      );

      setLoggedIn(res.ok);
    }

    checkLogin();
  }, []);

  // LOAD PRODUCTS
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(
        "/api/products"
      );

      const data = await res.json();

      setProducts(data);
    }

    loadProducts();
  }, []);

  // FILTER SEARCH
  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.brand
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      {/* NAVBAR */}
      <div className="flex items-center justify-between bg-[#D8C6C0] px-8 py-5">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            className="rounded-full shadow-lg border-2 border-white"
            src={logo}
            alt="logo"
            width={60}
            height={60}
          />

          <span
            className="text-4xl text-[#F7F2EF]"
            style={{
              fontFamily:
                "'Great Vibes', cursive",
            }}
          >
            Q Fashion
          </span>
        </Link>

        {/* SEARCH */}
        <div className="relative w-[450px]">
          <input
            type="text"
            placeholder="Search your items..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full rounded-full bg-[#F7F2EF] px-5 py-3 pl-12 text-black shadow-lg outline-none focus:ring-2 focus:ring-[#d192bd] transition"
          />

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🧵
          </span>

          {search && (
            <SearchPopup
              products={
                filteredProducts
              }
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          {/* LOGIN / LOGOUT */}
          {loggedIn ? (
            <button
              onClick={
                handleLogout
              }
              className="bg-[#8B6B61] text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/SessionManagement/login"
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}

          {/* HISTORY */}
          <Link
            href="/PaymentSystem/history"
            title="Order History"
            className="text-white text-3xl hover:text-gray-300 transition"
          >
            📦
          </Link>

          {/* CART */}
          <Link
            href="/PaymentSystem/cart"
            title="Cart"
            className="relative text-white text-3xl hover:text-gray-300 transition"
          >
            🧺

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-xs flex items-center justify-center font-bold text-white">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={heroImage.src}
          alt="Hero"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-xl">
            Timeless Fashion
          </h1>

          <p className="mt-3 text-xs md:text-base tracking-widest uppercase text-gray-200">
            Modern • Elegant • Everyday
          </p>

          <p className="text-[10px] md:text-sm text-gray-300 mt-2">
            Click • Pay • Delivered
          </p>

          <p className="text-[10px] md:text-sm text-gray-300 mt-2">
            Returns accepted within 30 days
          </p>
        </div>
      </section>
    </>
  );
}