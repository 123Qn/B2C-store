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

    <div className="w-full min-h-screen bg-[#FFF8F3]">

      {/* NAVBAR */}
      <TopMenu />

      {/* CONTENT */}
      <main className="flex flex-col lg:flex-row w-full">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-64 shrink-0">

          <LeftMenu />

        </aside>

        {/* MAIN CONTENT */}
        <section className="flex-1 p-4 md:p-6 overflow-hidden">

          {children}

        </section>

      </main>

    </div>

  );

}