"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E9B63B]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl w-96"
      >
        <h1 className="text-2xl font-bold mb-2">
          Buyer Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}