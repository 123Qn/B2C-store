"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowRightStartOnRectangleIcon,
  ArchiveBoxIcon,
  BuildingStorefrontIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const sections = [
  {
    href: "/admin/products",
    title: "Products",
    desc: "Add, edit, and manage products",
    Icon: CubeIcon,
  },
  {
    href: "/admin/orders",
    title: "Orders",
    desc: "View all purchase records",
    Icon: ArchiveBoxIcon,
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) { router.push("/SessionManagement/login"); return; }

      const payload = JSON.parse(atob(token.split(".")[1] ?? ""));
      if (payload.role !== "ADMIN") { router.push("/"); }
    } catch {
      router.push("/SessionManagement/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("auth_token");
    router.push("/SessionManagement/login");
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Q Fashion</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Admin Dashboard</h1>
            <p className="mt-1 text-stone-500">Manage your store</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-ink"
            >
              <BuildingStorefrontIcon className="h-5 w-5" /> View store
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map(({ href, title, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-8 transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-stone-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-1 text-stone-500">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Open <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
