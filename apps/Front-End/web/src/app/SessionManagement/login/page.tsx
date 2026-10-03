"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/Layout/AuthShell";
import { authStyles as s } from "@/styles/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // SHOW NOTICE AFTER REGISTERING
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("registered")) {
      setNotice("Account created. Please sign in with your new details.");
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        if (data.user?.role === "ADMIN") { router.push("/admin"); return; }
        router.push("/");
        return;
      }

      setError(data.message || "Invalid email or password");
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      panelTitle="Timeless Fashion"
      panelText="Modern, elegant everyday pieces — delivered to your door."
      features={["Free delivery", "30-day returns", "Secure payments"]}
    >
      <div className={s.header}>
        <h1 className={s.title}>Login</h1>
        <p className={s.subtitle}>Welcome back! Sign in to continue shopping.</p>
      </div>

      <form onSubmit={handleLogin} className={s.form}>
        {notice && <p className={s.success}>{notice}</p>}
        {error && <p className={s.error} role="alert">{error}</p>}

        <div className={s.fieldWrapper}>
          <label htmlFor="email" className={s.label}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={s.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={s.fieldWrapper}>
          <label htmlFor="password" className={s.label}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={s.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          data-testid="login-btn"
          disabled={submitting}
          className={s.submitBtn}
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className={s.switchText}>
        Don&apos;t have an account?{" "}
        <Link href="/SessionManagement/register" className={s.switchLink}>Create one</Link>
      </p>
    </AuthShell>
  );
}
