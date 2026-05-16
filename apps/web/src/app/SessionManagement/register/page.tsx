"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          "Account created successfully"
        );

        router.push(
          "/SessionManagement/login"
        );

        return;
      }

      alert(
        data.error ||
          "Register failed"
      );
    } catch (error) {
      console.log(error);

      alert("Server error");
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3] flex items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-[#E9B63B] p-12 text-black">
          
          <h1 className="text-5xl font-bold leading-tight">
            Join Our Store
          </h1>

          <p className="mt-6 text-lg text-black/80 leading-relaxed">
            Create your account and start
            shopping your favorite
            products with exclusive
            deals and fast checkout.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              ✨ Easy Shopping Experience
            </div>

            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              🚚 Fast Delivery
            </div>

            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              🔒 Secure Payments
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-10 lg:p-12">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Register to continue
              shopping
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-5"
          >
            
            {/* USERNAME */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Username
              </label>

              <input
                type="text"
                placeholder="john123"
                className="border border-gray-300 rounded-2xl w-full p-4 outline-none focus:ring-2 focus:ring-black transition"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                className="border border-gray-300 rounded-2xl w-full p-4 outline-none focus:ring-2 focus:ring-black transition"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="border border-gray-300 rounded-2xl w-full p-4 outline-none focus:ring-2 focus:ring-black transition"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="border border-gray-300 rounded-2xl w-full p-4 outline-none focus:ring-2 focus:ring-black transition"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-black text-white w-full p-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition mt-2"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/SessionManagement/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}