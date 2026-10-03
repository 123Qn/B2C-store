"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { leftMenuStyles as s } from "@/styles/leftMenu";
import { safeDecode } from "@/lib/format";

type MenuLink = { label: string; href: string };

export function MenuLinks({ links }: { links: MenuLink[] }) {
  const pathname = usePathname();

  return (
    <div className={s.linkList}>
      {links.map((link) => {
        const active = safeDecode(pathname) === safeDecode(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? s.linkActive : s.link}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
