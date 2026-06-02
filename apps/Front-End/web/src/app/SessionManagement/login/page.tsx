"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authStyles as s } from "@/styles/auth";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("auth_token", data.token);
        if (data.user?.role === "BUYER") { router.push("/"); return; }
        if (data.user?.role === "ADMIN") { router.push("/admin"); return; }
      }

      alert(data.message || "Invalid email or password");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <main className={s.loginPage}>
      <form onSubmit={handleLogin} className={s.loginForm}>
        <div className={s.loginHeader}>
          <h1 className={s.loginTitle}>Login</h1>
          <p className={s.loginSubtitle}>Sign in to continue shopping</p>
        </div>
        <div className={s.loginFields}>
          <input
            type="email"
            placeholder="Email"
            className={s.loginInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={s.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/SessionManagement/register" className={s.loginRegisterLink}>
            Don't have an account? Register
          </Link>
          <button
            type="submit"
            data-testid="login-btn"
            className={s.loginBtn}
          >
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
}