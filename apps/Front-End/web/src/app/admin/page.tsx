"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your store</p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="bg-white rounded-2xl p-8 shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">👟</div>
          <h2 className="text-2xl font-bold mb-2">Products</h2>
          <p className="text-gray-500">Add, edit, and manage products</p>
        </Link>
        <Link href="/admin/orders" className="bg-white rounded-2xl p-8 shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">Orders</h2>
          <p className="text-gray-500">View all purchase records</p>
        </Link>
      </div>
    </div>
  );
}