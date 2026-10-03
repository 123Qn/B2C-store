"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readToken } from "@/lib/auth";

// Hides admin pages from non-admins. Real protection is on the API.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const payload = readToken();
    if (!payload) { router.replace("/SessionManagement/login"); return; }
    if (payload.role !== "ADMIN") { router.replace("/"); return; }
    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return <div className="flex min-h-screen items-center justify-center bg-cream text-stone-400">Checking access…</div>;
  }

  return <>{children}</>;
}
