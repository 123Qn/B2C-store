"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import logo from "../../../public/wsulogo.png";
import heroImage from "../../asset/image/hero.webp";

import { useCart } from "../Cart/Cart";

import { products } from "@repo/db/data";

import { SearchPopup } from "../Search/SearchPopup";
import { handleLogout } from "../../app/logout/page";
export function TopMenu() {

  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const { cart } = useCart();

  useEffect(() => {

    async function checkLogin() {

      const res = await fetch("/api/auth/check");

      setLoggedIn(res.ok);

    }

    checkLogin();

  }, []);


  return (
    <>

      {/* NAVBAR */}
      <div
        className="
          flex items-center justify-between
          bg-[#758A93]
          px-8 py-5
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
          />

          <span
            className="
              text-2xl
              font-bold
              text-[white]
              tracking-wide
            "
          >
            Quan Store
          </span>

        </Link>

        {/* Search */}
        <div className="relative w-[450px]">

          <input
            type="text"
            placeholder="Search fashion..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-full
              bg-white
              px-5 py-3 pl-12
              text-black
              shadow-lg
              outline-none
              focus:ring-2
              focus:ring-gray-400
            "
          />

          <span
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-gray-400
            "
          >
            🔍
          </span>

          {search && (
            <SearchPopup
              products={filteredProducts}
            />
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Login / Logout */}
          {loggedIn ? (

            <button
              onClick={handleLogout}
              className="
                bg-black
                text-white
                px-4 py-2
                rounded-full
                hover:bg-gray-800
                transition
              "
            >
              Logout
            </button>

          ) : (

            <Link
              href="/login"
              className="
                bg-white
                text-black
                px-4 py-2
                rounded-full
                hover:bg-gray-200
                transition
              "
            >
              Login
            </Link>

          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="
              relative
              text-white
              text-3xl
            "
          >

            🛒

            {cart.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  w-6
                  h-6
                  rounded-full
                  bg-red-500
                  text-xs
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-white
                "
              >
                {cart.length}
              </span>

            )}

          </Link>

        </div>

      </div>

      {/* HERO */}
      <section
        className="
          relative
          w-full
          h-[180px]
          md:h-[250px]
          overflow-hidden
        "
      >

        {/* Background Image */}
        <img
          src={heroImage.src}
          alt="Hero"
          className="
            w-full
            h-full
            object-cover
          "
        />

        {/* Dark Overlay */}
        <div
          className="
            absolute inset-0
            bg-black/50
          "
        />

        {/* Content */}
        <div
          className="
            absolute inset-0
            flex flex-col
            items-center
            justify-center
            text-center
            text-white
            px-4
          "
        >

          <h1
            className="
              text-3xl
              md:text-5xl
              font-black
              uppercase
              tracking-[0.2em]
              drop-shadow-xl
            "
          >
            Timeless Fashion
          </h1>

          <p
            className="
              mt-3
              text-xs
              md:text-base
              tracking-widest
              uppercase
              text-gray-200
            "
          >
            Modern • Elegant • Everyday
          </p>

          <p
            className="
              text-[10px]
              md:text-sm
              text-gray-300
              mt-2
            "
          >
            Click • Pay • Delivered
          </p>

        </div>

      </section>

    </>
  );
}