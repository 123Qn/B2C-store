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

    const res = await fetch("/api/auth", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      router.push("/");
      return;
    }

    alert("Invalid email or password");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E9B63B] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl border"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Buyer Login
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue shopping
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl w-full p-3 outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-xl w-full p-3 outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
          <Link href="/SessionManagement/register" className="text-black hover:underline text-sm">
            Don't have an account? Register
          </Link>
          <button className="bg-black text-white w-full p-3 rounded-xl font-semibold hover:opacity-90 transition">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}