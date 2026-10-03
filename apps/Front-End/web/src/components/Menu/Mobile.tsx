"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { leftMenuStyles as s } from "@/styles/leftMenu";

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // CLOSE AFTER NAVIGATING
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className={s.mobileWrapper}>
      <button
        onClick={() => setOpen(!open)}
        className={s.mobileBar}
        aria-expanded={open}
      >
        <span>Browse</span>
        <span className={s.mobileToggle}>
          {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </span>
      </button>
      {open && (
        <div className={s.mobileContent}>
          {children}
        </div>
      )}
    </div>
  );
}
