import type { PropsWithChildren }
from "react";

import { LeftMenu }
from "../Menu/LeftMenu";

import { TopMenu }
from "./TopMenu";

export async function AppLayout({
  children,
}: PropsWithChildren) {

  return (

    <div className="min-h-screen w-full bg-cream text-ink">

      {/* NAVBAR */}
      <TopMenu />

      {/* CONTENT */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col lg:flex-row">

        {/* SIDEBAR */}
        <LeftMenu />

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">

          {children}

        </main>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-8 text-sm text-stone-500 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Quan Store</span>
          <span>Free shipping · 30-day returns · Secure checkout</span>
        </div>
      </footer>

    </div>

  );

}
