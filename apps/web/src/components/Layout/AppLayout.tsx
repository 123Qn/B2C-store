import type { PropsWithChildren } from "react";

import { LeftMenu } from "../Menu/LeftMenu";
import { TopMenu } from "./TopMenu";

export async function AppLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="w-full min-h-screen">

      {/* Navbar */}
      <TopMenu />
      {/* Content Area */}
      <main className="flex w-full">
        {/* Sidebar */}
        <LeftMenu />
        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}