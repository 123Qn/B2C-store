"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <main>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {error && <p>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}