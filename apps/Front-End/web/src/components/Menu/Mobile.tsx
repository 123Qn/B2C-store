"use client";

import { useState } from "react";
import { leftMenuStyles as s } from "@/styles/leftMenu";

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.mobileWrapper}>
      <div className={s.mobileBar}>
        <h1 className={s.mobileTitle}>Menu</h1>
        <button onClick={() => setOpen(!open)} className={s.mobileToggle}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className={s.mobileContent}>
          {children}
        </div>
      )}
    </div>
  );
}