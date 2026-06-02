"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json()

if (res.ok) {
  localStorage.setItem("auth_token", data.token)  // ← save JWT
  
  if (data.user?.role === "BUYER") {
    router.push("/")
    return
  }
  if (data.user?.role === "ADMIN") {
    router.push("/admin")
    return
  }
}

alert(data.message || "Invalid email or password")

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E9B63B] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl border"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl w-full p-3 outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-xl w-full p-3 outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            href="/SessionManagement/register"
            className="text-black hover:underline text-sm"
          >
            Don't have an account? Register
          </Link>

          <button
            type="submit"
            className="bg-black text-white w-full p-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}