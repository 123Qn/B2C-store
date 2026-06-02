"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authStyles as s } from "@/styles/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }

    try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, email, password }),
});

      const data = await res.json();
      if (res.ok) { alert("Account created successfully"); router.push("/SessionManagement/login"); return; }
      alert(data.error || "Register failed");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }

  return (
    <main className={s.registerPage}>
      <div className={s.registerCard}>

        {/* LEFT */}
        <div className={s.leftPanel}>
          <h1 className={s.leftTitle}>Join Our Store</h1>
          <p className={s.leftDesc}>Create your account and start shopping your favorite products with exclusive deals and fast checkout.</p>
          <div className={s.leftFeatures}>
            <div className={s.leftFeature}>✨ Easy Shopping Experience</div>
            <div className={s.leftFeature}>🚚 Fast Delivery</div>
            <div className={s.leftFeature}>🔒 Secure Payments</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={s.rightPanel}>
          <div className={s.rightHeader}>
            <h2 className={s.rightTitle}>Create Account</h2>
            <p className={s.rightSubtitle}>Register to continue shopping</p>
          </div>

          <form onSubmit={handleRegister} className={s.registerForm}>
            <div className={s.fieldWrapper}>
              <label className={s.label}>Username</label>
              <input type="text" placeholder="john123" className={s.input} value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={s.fieldWrapper}>
              <label className={s.label}>Email Address</label>
              <input type="email" placeholder="example@email.com" className={s.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={s.fieldWrapper}>
              <label className={s.label}>Password</label>
              <input type="password" placeholder="••••••••" className={s.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className={s.fieldWrapper}>
              <label className={s.label}>Confirm Password</label>
              <input type="password" placeholder="••••••••" className={s.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className={s.submitBtn}>Create Account</button>
          </form>

          <div className={s.loginLinkWrapper}>
            Already have an account?{" "}
            <Link href="/SessionManagement/login" className={s.loginLink}>Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}