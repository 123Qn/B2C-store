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
    <>
      <main className="login-wrapper">
        <div className="login-card">
          <p className="login-eyebrow">Admin Portal</p>
          <h1>Sign in to your account</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </main>
    </>
  );
}