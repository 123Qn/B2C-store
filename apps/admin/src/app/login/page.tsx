"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E9B63B]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="mb-6">Sign in to your account</p>

        <label>Password</label>
        <input
          className="border w-full p-2 my-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Sign In
        </button>
      </form>
    </main>
  );
}