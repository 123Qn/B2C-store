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

    <div className="w-full min-h-screen">

      {/* NAVBAR */}
      <TopMenu />

      {/* CONTENT */}
      <main
        className="
          flex
          flex-col
          lg:flex-row
          w-full
        "
      >

        {/* SIDEBAR */}
        <div
          className="
            w-full
            lg:w-64
            shrink-0
          "
        >
          <LeftMenu />
        </div>

        {/* MAIN CONTENT */}
        <div
          className="
            flex-1
            p-4
            md:p-6
          "
        >
          {children}
        </div>

      </main>

    </div>

  );

}