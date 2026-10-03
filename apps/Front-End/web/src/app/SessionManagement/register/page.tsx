"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/Layout/AuthShell";
import { authStyles as s } from "@/styles/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }

    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) { router.push("/SessionManagement/login?registered=1"); return; }
      setError(data.error || data.message || "Could not create your account");
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      panelTitle="Join Our Store"
      panelText="Create your account and start shopping your favorite products with exclusive deals and fast checkout."
      features={["✨ Easy shopping", "🚚 Fast delivery", "🔒 Secure payments"]}
    >
      <div className={s.header}>
        <h1 className={s.title}>Create Account</h1>
        <p className={s.subtitle}>Register to continue shopping</p>
      </div>

      <form onSubmit={handleRegister} className={s.form}>
        {error && <p className={s.error} role="alert">{error}</p>}

        <div className={s.fieldWrapper}>
          <label htmlFor="username" className={s.label}>Username</label>
          <input id="username" type="text" placeholder="john123" autoComplete="username" className={s.input} value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={s.fieldWrapper}>
          <label htmlFor="email" className={s.label}>Email Address</label>
          <input id="email" type="email" placeholder="example@email.com" autoComplete="email" className={s.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={s.fieldWrapper}>
          <label htmlFor="password" className={s.label}>Password</label>
          <input id="password" type="password" placeholder="••••••••" autoComplete="new-password" className={s.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={s.fieldWrapper}>
          <label htmlFor="confirm-password" className={s.label}>Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={s.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={passwordsMismatch}
            required
          />
          {passwordsMismatch && <p className="mt-1.5 text-xs text-red-600">Passwords do not match</p>}
        </div>
        <button type="submit" disabled={submitting} className={s.submitBtn}>
          {submitting ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className={s.switchText}>
        Already have an account?{" "}
        <Link href="/SessionManagement/login" className={s.switchLink}>Sign in</Link>
      </p>
    </AuthShell>
  );
}
